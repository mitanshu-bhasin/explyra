// js/chat-ai-helper.js
import { collection, query, where, orderBy, limit, getDocs, addDoc, serverTimestamp, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

const AI_CONFIG = window.AI_CONFIG || {
    apiKey: (window.EXPLYRA_CONFIG?.ai?.apiKey || "REDACTED"),
    url: 'https://api.groq.com/openai/v1/chat/completions',
    model: 'moonshotai/kimi-k2-instruct-0905'
};

export async function handleAIChatRequest(db, userData, companyId, currentChatContext, currentChatUser) {
    try {
        let q;
        const isGlobal = currentChatContext === 'global' || currentChatContext === 'global_chat';
        const isGroup = typeof currentChatContext === 'string' && currentChatContext.startsWith('group_');
        let targetType = 'direct';
        let targetId = null;

        if (isGlobal) {
            targetType = 'global';
            q = companyId
                ? query(
                    collection(db, "global_chat"),
                    where("companyId", "==", companyId),
                    orderBy("createdAt", "desc"),
                    limit(5)
                )
                : query(
                    collection(db, "global_chat"),
                    orderBy("createdAt", "desc"),
                    limit(5)
                );
        } else if (isGroup) {
            targetType = 'group';
            targetId = currentChatContext.replace('group_', '');
            q = query(
                collection(db, "group_chats", targetId, "messages"),
                orderBy("createdAt", "desc"),
                limit(5)
            );
        } else {
            // Direct chat
            const combinedId = currentChatContext && currentChatContext.startsWith('chat_')
                ? currentChatContext
                : (currentChatUser?.docId
                    ? (userData.docId < currentChatUser.docId
                        ? `chat_${userData.docId}_${currentChatUser.docId}`
                        : `chat_${currentChatUser.docId}_${userData.docId}`)
                    : null);

            if (!combinedId) {
                throw new Error('Unable to resolve direct chat context for AI request.');
            }

            targetType = 'direct';
            targetId = combinedId;
            q = query(
                collection(db, "chats", combinedId, "messages"),
                orderBy("createdAt", "desc"),
                limit(5)
            );
        }

        const snap = await getDocs(q);
        const lastMessages = snap.docs.map(d => d.data()).reverse();

        // Format history for AI
        const historyText = lastMessages.map(m => {
            const body = m.text || (m.type === 'voice' ? '[Voice message]' : '[Attachment]');
            return `${m.sender || m.email}: ${body}`;
        }).join('\n');

        const systemPrompt = `You are Explyra Chat AI, a helpful office assistant. 
        You are participating in a group or private chat. 
        Read the last messages and provide helpful advice, a summary, or a direct response to the situation. 
        Keep your response concise, professional, and useful. 
        Context: ${targetType === 'global' ? 'Global Group Chat' : (targetType === 'group' ? 'Private Group Chat' : 'Private Direct Message')}.
        User Info: ${userData.name || userData.email} (${userData.role || 'User'}).
        Current Chat History:
        ${historyText}`;

        const response = await fetch(AI_CONFIG.url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${AI_CONFIG.apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: AI_CONFIG.model,
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: "Please analyze the situation and give your advice or reply." }
                ],
                temperature: 0.7
            })
        });


        const data = await response.json();
        const aiText = data?.choices?.[0]?.message?.content || 'I could not analyze the context right now. Please try again.';

        // Save AI response to Firestore
        const aiMsgData = {
            text: `🤖 **AI Advice:** ${aiText}`,
            sender: "Explyra AI Agent",
            senderPhotoUrl: "assets/images/explyra_logo.png",
            email: "ai-agent@explyra.me",
            role: "AI",
            type: "ai",
            read: false,
            createdAt: serverTimestamp(),
            seenBy: userData?.docId ? [userData.docId] : [],
            companyId: companyId
        };

        if (targetType === 'global') {
            await addDoc(collection(db, "global_chat"), aiMsgData);
        } else if (targetType === 'group') {
            await addDoc(collection(db, "group_chats", targetId, "messages"), aiMsgData);
            await setDoc(doc(db, "group_chats", targetId), {
                lastMessage: `🤖 AI: ${aiText.substring(0, 50)}...`,
                lastMessageAt: serverTimestamp(),
                lastSender: 'ai-agent',
                read: false
            }, { merge: true });
        } else {
            await addDoc(collection(db, "chats", targetId, "messages"), aiMsgData);

            // Update last message in meta
            await setDoc(doc(db, "chats", targetId), {
                lastMessage: `🤖 AI: ${aiText.substring(0, 50)}...`,
                lastMessageAt: serverTimestamp(),
                lastSender: 'ai-agent',
                read: false
            }, { merge: true });
        }

    } catch (error) {
        console.error("AI Chat Error:", error);
    }
}

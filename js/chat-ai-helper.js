// js/chat-ai-helper.js
import { collection, query, orderBy, limit, getDocs, addDoc, serverTimestamp, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

const AI_CONFIG = window.AI_CONFIG || {
    apiKey: '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',
    url: 'https://api.groq.com/openai/v1/chat/completions',
    model: 'moonshotai/kimi-k2-instruct-0905'
};

export async function handleAIChatRequest(db, userData, companyId, currentChatContext, currentChatUser) {
    try {
        let q;
        let isGlobal = currentChatContext === 'global' || currentChatContext === 'global_chat';
        
        if (isGlobal) {
            q = query(
                collection(db, "global_chat"),
                orderBy("createdAt", "desc"),
                limit(5)
            );
        } else {
            // Private chat
            const combinedId = currentChatContext.startsWith('chat_') ? currentChatContext : 
                (userData.docId < currentChatUser.docId ? 
                 `chat_${userData.docId}_${currentChatUser.docId}` : 
                 `chat_${currentChatUser.docId}_${userData.docId}`);
            
            q = query(
                collection(db, "chats", combinedId, "messages"),
                orderBy("createdAt", "desc"),
                limit(5)
            );
        }

        const snap = await getDocs(q);
        const lastMessages = snap.docs.map(d => d.data()).reverse();

        // Format history for AI
        const historyText = lastMessages.map(m => `${m.sender || m.email}: ${m.text}`).join('\n');

        const systemPrompt = `You are Explyra Chat AI, a helpful office assistant. 
        You are participating in a group or private chat. 
        Read the last messages and provide helpful advice, a summary, or a direct response to the situation. 
        Keep your response concise, professional, and useful. 
        Context: ${isGlobal ? 'Global Group Chat' : 'Private Direct Message'}.
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
        const aiText = data.choices[0].message.content;

        // Save AI response to Firestore
        const aiMsgData = {
            text: `🤖 **AI Advice:** ${aiText}`,
            sender: "Explyra AI Agent",
            senderPhotoUrl: "assets/images/explyra_logo.png",
            email: "ai-agent@explyra.me",
            role: "AI",
            read: false,
            createdAt: serverTimestamp(),
            companyId: companyId
        };

        if (isGlobal) {
            await addDoc(collection(db, "global_chat"), aiMsgData);
        } else {
            const combinedId = currentChatContext.startsWith('chat_') ? currentChatContext : 
                (userData.docId < currentChatUser.docId ? 
                 `chat_${userData.docId}_${currentChatUser.docId}` : 
                 `chat_${currentChatUser.docId}_${userData.docId}`);

            await addDoc(collection(db, "chats", combinedId, "messages"), aiMsgData);
            
            // Update last message in meta
            await setDoc(doc(db, "chats", combinedId), {
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

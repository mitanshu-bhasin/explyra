"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { getChatsForUser, getMessages, sendMessage, getExpert, getRetiredUser } from "@/lib/firestore";
import type { Chat, Message as Msg } from "@/lib/types";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Send, MessageSquare, ArrowLeft } from "lucide-react";

export default function MessagesPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [newMsg, setNewMsg] = useState("");
  const [chatPartners, setChatPartners] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (authLoading) return;
    if (!user) { router.push("/login"); return; }
    const load = async () => {
      const c = await getChatsForUser(user.uid);
      setChats(c);
      // Resolve partner names
      const partners: Record<string, string> = {};
      for (const chat of c) {
        const partnerId = chat.clientId === user.uid ? chat.expertId : chat.clientId;
        const partner = await getRetiredUser(partnerId);
        partners[chat.id] = partner?.displayName || "Unknown";
      }
      setChatPartners(partners);
      setLoading(false);
    };
    load();
  }, [user, authLoading, router]);

  // Real-time messages listener
  useEffect(() => {
    if (!selectedChat) return;
    const q = query(collection(db, "retired_chats", selectedChat, "messages"), orderBy("createdAt", "asc"));
    const unsub = onSnapshot(q, (snap) => {
      const msgs = snap.docs.map(d => ({ id: d.id, ...d.data() } as Msg));
      setMessages(msgs);
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    });
    return unsub;
  }, [selectedChat]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMsg.trim() || !selectedChat || !user) return;
    setSending(true);
    try {
      await sendMessage(selectedChat, {
        chatId: selectedChat,
        senderId: user.uid,
        senderName: user.displayName || "User",
        content: newMsg.trim(),
      });
      setNewMsg("");
    } catch (err) { console.error(err); }
    setSending(false);
  };

  if (authLoading || loading) {
    return <div style={{ display: "flex", justifyContent: "center", padding: "5rem" }}><div className="spinner" /></div>;
  }

  return (
    <div style={{ height: "calc(100vh - 72px)", display: "flex" }}>
      {/* Chat list sidebar */}
      <div style={{
        width: "320px",
        borderRight: "1px solid var(--color-border)",
        background: "#fff",
        display: selectedChat ? undefined : "block",
        overflowY: "auto",
      }} className="chat-sidebar">
        <div style={{ padding: "1.25rem", borderBottom: "1px solid var(--color-border)" }}>
          <h2 style={{ fontSize: "1.25rem" }}>Messages</h2>
        </div>
        {chats.length === 0 ? (
          <div style={{ textAlign: "center", padding: "3rem 1.5rem", color: "var(--color-text-muted)" }}>
            <MessageSquare size={40} style={{ margin: "0 auto 1rem", opacity: 0.3 }} />
            <p>No conversations yet</p>
            <p style={{ fontSize: "0.9rem", marginTop: "0.5rem" }}>Start a conversation by visiting an expert&apos;s profile.</p>
          </div>
        ) : (
          chats.map(chat => (
            <button
              key={chat.id}
              onClick={() => setSelectedChat(chat.id)}
              style={{
                width: "100%", display: "flex", alignItems: "center", gap: "0.85rem",
                padding: "1rem 1.25rem", background: selectedChat === chat.id ? "#f0f9ff" : "transparent",
                border: "none", borderBottom: "1px solid var(--color-border)",
                cursor: "pointer", textAlign: "left",
              }}
            >
              <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "var(--color-primary)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, flexShrink: 0 }}>
                {chatPartners[chat.id]?.[0] || "?"}
              </div>
              <div style={{ flex: 1, overflow: "hidden" }}>
                <div style={{ fontWeight: 600, marginBottom: "0.15rem" }}>{chatPartners[chat.id] || "Loading..."}</div>
                <div style={{ color: "var(--color-text-muted)", fontSize: "0.85rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {chat.lastMessage || "No messages yet"}
                </div>
              </div>
            </button>
          ))
        )}
      </div>

      {/* Chat area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#f8fafc" }} className="chat-area">
        {!selectedChat ? (
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-text-muted)" }}>
            <div style={{ textAlign: "center" }}>
              <MessageSquare size={56} style={{ margin: "0 auto 1rem", opacity: 0.2 }} />
              <h3>Select a conversation</h3>
              <p style={{ marginTop: "0.5rem" }}>Choose from your existing chats to start messaging.</p>
            </div>
          </div>
        ) : (
          <>
            {/* Chat header */}
            <div style={{ padding: "1rem 1.5rem", borderBottom: "1px solid var(--color-border)", background: "#fff", display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <button onClick={() => setSelectedChat(null)} className="mobile-back" style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-secondary)" }}>
                <ArrowLeft size={22} />
              </button>
              <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "var(--color-primary)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700 }}>
                {chatPartners[selectedChat]?.[0] || "?"}
              </div>
              <h3 style={{ margin: 0, fontSize: "1.1rem" }}>{chatPartners[selectedChat]}</h3>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, overflowY: "auto", padding: "1.5rem" }}>
              {messages.map(msg => (
                <div key={msg.id} style={{ display: "flex", justifyContent: msg.senderId === user?.uid ? "flex-end" : "flex-start", marginBottom: "0.75rem" }}>
                  <div style={{
                    maxWidth: "70%", padding: "0.85rem 1.1rem",
                    borderRadius: msg.senderId === user?.uid ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                    background: msg.senderId === user?.uid ? "var(--color-primary)" : "#fff",
                    color: msg.senderId === user?.uid ? "#fff" : "var(--color-text)",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                  }}>
                    {msg.senderId !== user?.uid && (
                      <div style={{ fontWeight: 600, fontSize: "0.82rem", marginBottom: "0.25rem", color: "var(--color-primary)" }}>{msg.senderName}</div>
                    )}
                    <p style={{ margin: 0, lineHeight: 1.6 }}>{msg.content}</p>
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Message input */}
            <form onSubmit={handleSend} style={{ padding: "1rem 1.5rem", borderTop: "1px solid var(--color-border)", background: "#fff", display: "flex", gap: "0.75rem" }}>
              <input
                className="form-input"
                placeholder="Type a message..."
                value={newMsg}
                onChange={e => setNewMsg(e.target.value)}
                style={{ flex: 1 }}
              />
              <button type="submit" className="btn btn-primary" disabled={sending || !newMsg.trim()}>
                <Send size={18} />
              </button>
            </form>
          </>
        )}
      </div>

      <style>{`
        .mobile-back { display: none; }
        @media (max-width: 768px) {
          .chat-sidebar { width: 100% !important; display: ${selectedChat ? "none" : "block"} !important; }
          .chat-area { display: ${selectedChat ? "flex" : "none"} !important; }
          .mobile-back { display: block !important; }
        }
      `}</style>
    </div>
  );
}

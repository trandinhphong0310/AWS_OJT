import React, { useEffect, useRef, useState } from "react";
import axios from "./api";
import dayjs from "dayjs";

/**
 * Chatbot component
 * - Upload file (POST /upload)
 * - Send question (POST /ask)
 * - Stores history in localStorage (key: ai_doc_chat_history_v1)
 */

const STORAGE_KEY = "ai_doc_chat_history_v1";

function Message({ m }) {
    return (
        <div className={`message ${m.role}`}>
            <div className="meta" aria-hidden>
                <span className="role">{m.role === "user" ? "Bạn" : m.role === "assistant" ? "AI" : "Hệ thống"}</span>
                <span className="time">{dayjs(m.time).format("HH:mm")}</span>
            </div>
            <div className="content" role="article" aria-label={`${m.role} message`}>
                {m.text}
            </div>
            {m.sources?.length > 0 && (
                <div className="sources" aria-live="polite">
                    <strong>Nguồn:</strong>
                    <ul>
                        {m.sources.map((s, i) => (
                            <li key={i}>{s}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default function Chatbot() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [typing, setTyping] = useState(false);
    const [error, setError] = useState(null);
    const [mode, setMode] = useState("auto"); // auto | document | general | hybrid
    const inputRef = useRef(null);
    const listRef = useRef(null);

    useEffect(() => {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
            try {
                setMessages(JSON.parse(raw));
            } catch (e) {
                setMessages([]);
                console.log(e)
            }
        }
    }, []);

    // scroll + persist
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
        // scroll to bottom
        if (listRef.current) {
            // small timeout to allow DOM update
            setTimeout(() => {
                listRef.current.scrollTop = listRef.current.scrollHeight;
            }, 20);
        }
    }, [messages]);

    const pushMessage = (m) => {
        setMessages((prev) => [...prev, m]);
    };

    const handleFile = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setError(null);
        setUploading(true);
        setUploadProgress(0);

        const form = new FormData();
        form.append("file", file);

        try {
            const res = await axios.post("/upload", form, {
                headers: { "Content-Type": "multipart/form-data" },
                onUploadProgress: (ev) => {
                    if (ev.total) {
                        setUploadProgress(Math.round((ev.loaded / ev.total) * 100));
                    }
                },
            });

            pushMessage({
                role: "system",
                text: `Upload thành công: ${file.name} — máy chủ trả về: ${res.data?.message ?? "OK"}`,
                time: new Date().toISOString(),
            });
        } catch (err) {
            console.error(err);
            const msg = err?.response?.data?.message || err.message || "Upload thất bại";
            setError(msg);
            pushMessage({
                role: "system",
                text: `Upload lỗi: ${msg}`,
                time: new Date().toISOString(),
            });
        } finally {
            setUploading(false);
            setUploadProgress(0);
            e.target.value = "";
        }
    };

    // Ensure we don't call multiple concurrent ask requests
    const sendQuestion = async (question) => {
        if (!question || !question.trim()) return;
        if (typing || uploading) {
            // prevent concurrent calls
            pushMessage({
                role: "system",
                text: "Vui lòng chờ: một yêu cầu đang được xử lý.",
                time: new Date().toISOString(),
            });
            return;
        }

        setError(null);

        // push user message
        const userMsg = { role: "user", text: question.trim(), time: new Date().toISOString() };
        pushMessage(userMsg);

        setTyping(true);

        try {
            const payload = { question: question.trim() };
            if (mode !== "auto") payload.mode = mode;

            const res = await axios.post("/ask", payload, { timeout: 120000 });

            const ans = res.data?.answer ?? "Không có phản hồi từ server.";
            const sources = Array.isArray(res.data?.sources) ? res.data.sources : [];
            const usedMode = res.data?.mode ?? "unknown";

            const botMsg = {
                role: "assistant",
                text: ans,
                sources,
                meta: { mode: usedMode },
                time: new Date().toISOString(),
            };

            pushMessage(botMsg);
        } catch (err) {
            console.error(err);
            const msg = err?.response?.data?.message || err.message || "Gặp lỗi khi gọi API";
            setError(msg);
            pushMessage({
                role: "assistant",
                text: `Lỗi khi lấy câu trả lời: ${msg}`,
                time: new Date().toISOString(),
            });
        } finally {
            setTyping(false);
            setInput("");
            inputRef.current?.focus();
        }
    };

    const handleSend = () => {
        if (!input.trim()) return;
        sendQuestion(input);
    };

    const clearHistory = () => {
        if (!window.confirm("Xác nhận xoá lịch sử chat local?")) return;
        setMessages([]);
        localStorage.removeItem(STORAGE_KEY);
    };

    const sampleQuestions = [
        "Theo file, giới thiệu mục 2.1 của tài liệu",
        "Tóm tắt nội dung file này trong 3 câu",
        "Gemini là gì?",
        "Hybrid: nội dung file có liên quan đến công nghệ AI hiện nay không?",
    ];

    return (
        <div className="chatbot-root">
            <div className="toolbar">
                <label className="upload-btn" aria-label="Upload file">
                    Chọn file (PDF/DOCX/TXT/CSV)
                    <input type="file" accept=".pdf,.docx,.txt,.csv" onChange={handleFile} />
                </label>

                <div className="mode-select" role="radiogroup" aria-label="Chế độ hỏi">
                    <label>
                        <input type="radio" name="mode" checked={mode === "auto"} onChange={() => setMode("auto")} />
                        Tự động
                    </label>
                    <label>
                        <input type="radio" name="mode" checked={mode === "document"} onChange={() => setMode("document")} />
                        Chỉ tài liệu
                    </label>
                    <label>
                        <input type="radio" name="mode" checked={mode === "general"} onChange={() => setMode("general")} />
                        Kiến thức chung
                    </label>
                    <label>
                        <input type="radio" name="mode" checked={mode === "hybrid"} onChange={() => setMode("hybrid")} />
                        Kết hợp
                    </label>
                </div>

                <div className="actions">
                    <button type="button" className="btn" onClick={() => document.getElementById("sample-qs")?.scrollIntoView({ behavior: "smooth" })}>
                        Mẫu câu hỏi
                    </button>
                    <button type="button" className="btn danger" onClick={clearHistory}>Xoá lịch sử</button>
                </div>
            </div>

            <div className="chat-area">
                <div className="messages" ref={listRef} aria-live="polite">
                    {messages.length === 0 && <div className="empty">Chưa có cuộc hội thoại. Hãy upload file hoặc bắt đầu hỏi.</div>}
                    {messages.map((m, i) => (
                        <Message m={m} key={i} />
                    ))}
                    {typing && (
                        <div className="message assistant typing">
                            <div className="meta"><span className="role">AI</span><span className="time">{dayjs().format("HH:mm")}</span></div>
                            <div className="content">Đang suy nghĩ...</div>
                        </div>
                    )}
                </div>

                <div className="composer">
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Gõ câu hỏi rồi nhấn Enter hoặc Send..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => { if (e.key === "Enter") handleSend(); }}
                        aria-label="Nhập câu hỏi"
                        disabled={typing || uploading}
                    />
                    <button className="btn send" type="button" onClick={handleSend} disabled={typing || !input.trim() || uploading}>Send</button>
                </div>

                {uploading && (
                    <div className="upload-progress" role="status" aria-live="polite">Uploading... {uploadProgress}%</div>
                )}

                {error && <div className="error" role="alert">Lỗi: {error}</div>}

                <div id="sample-qs" className="sample-qs">
                    <h4>Mẫu câu hỏi sẵn có</h4>
                    <ul>
                        {sampleQuestions.map((q, idx) => (
                            <li key={idx}>
                                <button
                                    type="button"
                                    className="sample-btn"
                                    onClick={() => {
                                        setInput(q);
                                        // call sendQuestion after a tick so input updates (optional)
                                        setTimeout(() => sendQuestion(q), 50);
                                    }}
                                >
                                    {q}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

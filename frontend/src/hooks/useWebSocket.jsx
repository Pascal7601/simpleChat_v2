import { useEffect, useState, useRef } from "react";

const useWebSocket = (conversationId, senderId) => {
  const [messages, setMessages] = useState([]);
  const ws = useRef(null);

  useEffect(() => {
    if (!conversationId || !senderId) return;

    ws.current = new WebSocket(`ws://localhost:8002/ws/message/${conversationId}/${senderId}`);

    ws.current.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      setMessages((prev) => [...prev, newMessage]);
    };

    return () => {
      ws.current.close();
    };
  }, [conversationId, senderId]);

  const sendMessage = (msgData) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(msgData));
      console.log(msgData);
    }
  };

  return { messages, sendMessage };
};

export default useWebSocket;

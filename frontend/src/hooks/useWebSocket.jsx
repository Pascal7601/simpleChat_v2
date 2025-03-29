import { useEffect, useState, useRef } from "react";

const useWebSocket = (conversationId, senderId, setChatHistory = () => {}, chatHistory, selectedUser) => {
  const [messages, setMessages] = useState([]);
  const ws = useRef(null);

  useEffect(() => {
    if (!conversationId || !senderId) return;

    setMessages([]);

    ws.current = new WebSocket(`ws://simplechat-v2.onrender.com/ws/message/${conversationId}/${senderId}`);

    ws.current.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);

      // Update messages list
      setMessages((prev) => [...prev, newMessage]);

      // Update last message in chatHistory
      setChatHistory((prev) => ({
        ...prev,
        [selectedUser.id]: newMessage.content,  // Store only latest message
      }));
    };
    return () => {
      ws.current.close();
    };
  }, [conversationId, senderId]);

  const sendMessage = (msgData) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(msgData));
      console.log(messages)
      setChatHistory((prev) => {
        const updatedHistory = { 
          ...prev, 
          [selectedUser.id]: msgData.content 
        };
        return { ...updatedHistory }; // Forces UI update
      });
    }
  };

  return { messages, sendMessage, setMessages };
};

export default useWebSocket;

"use client";

import { useState, useEffect, useRef } from 'react';
import { Socket, io } from 'socket.io-client';
import { useStore } from '@/store';

interface Message {
  id: string;
  content: string;
  userId: string;
  userName: string;
  createdAt: Date;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const socketRef = useRef<Socket | null>(null);
  const { user } = useStore();

  useEffect(() => {
    socketRef.current = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001');

    socketRef.current.on('new-message', (message: Message) => {
      setMessages(prev => [...prev, message]);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now().toString(),
      content: newMessage,
      userId: user.id,
      userName: user.name,
      createdAt: new Date(),
    };

    socketRef.current?.emit('new-message', message);
    setNewMessage('');
  };

  return (
    <div className="h-[calc(100vh-200px)] flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex flex-col ${message.userId === user.id ? 'items-end' : 'items-start'}`}
          >
            <div className="text-sm text-gray-400">{message.userName}</div>
            <div className={`mt-1 px-4 py-2 rounded-lg ${message.userId === user.id ? 'bg-blue-600' : 'bg-gray-700'}`}>
              {message.content}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage} className="p-4 border-t border-gray-700">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
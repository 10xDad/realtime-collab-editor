"use client";

import { useEffect, useRef } from 'react';
import { Editor as MonacoEditor } from '@monaco-editor/react';
import { Socket, io } from 'socket.io-client';
import { useStore } from '@/store';

export default function Editor() {
  const socketRef = useRef<Socket | null>(null);
  const { content, setContent, language } = useStore();

  useEffect(() => {
    socketRef.current = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001');

    socketRef.current.on('content-change', (newContent: string) => {
      setContent(newContent);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  const handleEditorChange = (value: string = '') => {
    setContent(value);
    socketRef.current?.emit('content-change', value);
  };

  return (
    <div className="h-[calc(100vh-200px)]">
      <MonacoEditor
        height="100%"
        defaultLanguage={language}
        theme="vs-dark"
        value={content}
        onChange={handleEditorChange}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          wordWrap: 'on',
          automaticLayout: true,
        }}
      />
    </div>
  );
}
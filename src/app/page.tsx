import { Suspense } from 'react';
import Editor from '@/components/Editor';
import Chat from '@/components/Chat';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold mb-8">Realtime Collaborative Code Editor</h1>
      </div>
      
      <div className="flex w-full gap-4 flex-1">
        <div className="w-3/4 bg-gray-800 rounded-lg overflow-hidden shadow-xl">
          <Suspense fallback={<div>Loading editor...</div>}>
            <Editor />
          </Suspense>
        </div>
        
        <div className="w-1/4 bg-gray-800 rounded-lg overflow-hidden shadow-xl">
          <Suspense fallback={<div>Loading chat...</div>}>
            <Chat />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
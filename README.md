# Realtime Collaborative Code Editor

A powerful real-time collaborative code editor with syntax highlighting, multiple cursors, and live chat functionality. Built with Next.js, TypeScript, Prisma, and WebSocket.

## Features

- 🚀 Real-time code collaboration
- 💡 Syntax highlighting for multiple languages
- 👥 Multiple cursor support
- 💬 Live chat functionality
- 🎨 Beautiful UI with Tailwind CSS
- 🔒 TypeScript for type safety
- 📦 Database persistence with Prisma

## Tech Stack

- Next.js 14 with App Router
- TypeScript
- Prisma (SQLite)
- Socket.IO
- Monaco Editor
- Tailwind CSS
- Zustand

## Getting Started

1. Clone the repository
```bash
git clone https://github.com/10xDad/realtime-collab-editor.git
cd realtime-collab-editor
```

2. Install dependencies
```bash
npm install
```

3. Set up the database
```bash
npm run prisma:generate
npm run prisma:migrate
```

4. Start the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT
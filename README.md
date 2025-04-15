# AI Chat Application

A modern, responsive chat application with OpenAI integration that allows users to have AI-powered conversations.

## Features

- 💬 Real-time chat interface with AI responses
- 🧠 OpenAI-powered AI assistant
- 💾 PostgreSQL database for persistent message storage
- 🎨 Beautiful UI with message formatting
- 📱 Responsive design for desktop and mobile
- ⌨️ Markdown and code syntax highlighting support
- 🔄 Automatic message loading and scrolling

## Tech Stack

- **Frontend**: React, TypeScript, TailwindCSS, Shadcn UI
- **Backend**: Node.js, Express
- **Database**: PostgreSQL with Drizzle ORM
- **AI Integration**: GMGM.DEV LLM Gateway
- **State Management**: TanStack Query (React Query)
- **Routing**: Wouter

## Getting Started

### Prerequisites

- Node.js (v18+)
- PostgreSQL database
- gmgm.dev API key

### Environment Variables

The application requires the following environment variables:

- `DATABASE_URL`: PostgreSQL database connection string
- `OPENAI_API_KEY`: Your gmgm.dev API key

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables
4. Push the database schema:
   ```bash
   npm run db:push
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
├── client/                # Frontend React application
│   ├── src/
│   │   ├── components/    # UI components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utility functions
│   │   ├── pages/         # Page components
│   │   └── App.tsx        # Main application component
├── server/                # Backend Express server
│   ├── db.ts              # Database configuration
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API routes
│   ├── storage.ts         # Data storage layer
│   └── vite.ts            # Vite configuration for server
├── shared/                # Shared code between client and server
│   └── schema.ts          # Database schema
```

## API Endpoints

- `GET /api/messages`: Get all chat messages
- `POST /api/messages`: Send a message and get AI response

## Database Schema

The application uses two main tables:

- `users`: User accounts (for future authentication)
  - `id`: Primary key
  - `username`: Unique username
  - `password`: Hashed password

- `messages`: Chat messages
  - `id`: Primary key
  - `content`: Message content
  - `role`: Either 'user' or 'assistant'
  - `timestamp`: When the message was sent

## Future Enhancements

- User authentication and multiple conversations
- Message search functionality
- Image generation capabilities
- Voice input and output
- Conversation context management
- Customizable AI personality

## License

MIT

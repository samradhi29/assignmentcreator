# AI Assignment Generator

Live Demo: https://assignmentcreatorte5et.vercel.app/

Demo Video: https://drive.google.com/file/d/1WkQXU9whEcAfdaBnaeTykMEl16EI23s9/view?usp=sharing

An AI-powered Assignment Generator that creates structured academic assignments dynamically using AI.

---

# Features

- AI-generated assignment papers
- Structured question generation
- Real-time updates using WebSockets
- Background job processing with BullMQ
- PDF/file uploads using Cloudinary
- Assignment history & detail pages
- Responsive UI
- Proper form validation
- Zustand state management

---

# Tech Stack

## Frontend
- React.js
- Next.js
- TypeScript
- Tailwind CSS
- Zustand
- Socket.IO Client

## Backend
- Node.js
- Next.js API Routes
- TypeScript

## Database & Queue
- MongoDB
- Redis (Upstash)
- BullMQ

## Services
- Gemini API
- Cloudinary
- Socket.IO

---

# Architecture Flow

```txt
Frontend (Next.js)
        │
        ▼
API Route (/api/assignment/create)
        │
        ▼
BullMQ Queue (Redis / Upstash)
        │
        ▼
Worker Server (Render)
        │
        ▼
Gemini API
        │
        ▼
MongoDB
        │
        ▼
Socket.IO Update
        │
        ▼
Frontend
```

---

# Project Structure

```bash
app/
│
├── api/
│   └── assignment/
│       ├── create/
│       │   └── route.ts
│       ├── [id]/
│       │   ├── route.ts
│       │   └── page.tsx
│       ├── assignments/
│       │   └── page.tsx
│       └── createassignment/
│           └── page.tsx
│
├── mobilebottomnav/
├── navbar/
├── sidebar/
├── components/
│
├── lib/
│   ├── buildprompt.ts
│   ├── bullredis.ts
│   ├── cloudinary.ts
│   ├── db.ts
│   ├── gemini.ts
│   ├── queue.ts
│   ├── redis.ts
│   ├── socket.ts
│   ├── utils.ts
│   └── worker.ts
│
├── socket-server.ts
│
├── store/
│   └── assignmentStore.ts
│
└── models/
    └── schema.ts
```

---

# Assignment Generation Flow

1. User submits assignment request
2. API stores pending assignment
3. Job added to BullMQ queue
4. Worker processes assignment generation
5. Gemini generates structured questions
6. Result stored in MongoDB
7. Socket event updates frontend in real-time

---

# AI Output

The system converts user input into a structured prompt and generates:
- Sections (A, B, C...)
- Questions
- Difficulty levels
- Marks distribution

LLM responses are structured before rendering.

---

# Validation

- No empty fields
- No negative values
- File validation
- Structured request validation

---

# Routes

| Route | Description |
|---|---|
| `/` | Landing Page |
| `/assignments` | All Assignments |
| `/assignment/[id]` | Assignment Details |
| `/createassignment` | Create Assignment |
| `/api/assignment/create` | Create Assignment API |
| `/api/assignment/[id]` | Fetch Assignment API |

---

# Deployment

| Service | Platform |
|---|---|
| Frontend | Vercel |
| Worker Server | Render |
| Socket Server | Render |
| Redis | Upstash |
| File Storage | Cloudinary |

---

# Environment Variables

```env
MONGODB_URI=

REDIS_URL=

GEMINI_API_KEY=

NEXT_PUBLIC_SOCKET_URL=

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=

NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=
```

---

# Installation

```bash
git clone <repo-url>

npm install

npm run dev
```

Run Worker:
```bash
npm run worker
```

Run Socket Server:
```bash
npm run socket
```

---

# Author

Samradhi Rathore

Full Stack Developer | MERN Stack Developer

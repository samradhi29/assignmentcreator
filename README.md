# AI Assignment Generator

An AI-powered Assignment Generator built using modern full-stack technologies that allows users to create structured academic assignments dynamically using AI.

The platform supports:
- AI-generated question papers
- Background job processing
- Real-time status updates
- File uploads
- Assignment history
- PDF-ready structured output

---

# Features

- Create AI-generated assignments
- Upload supporting PDFs/files
- Real-time assignment generation updates using WebSockets
- Background processing using BullMQ
- Assignment history page
- Assignment detail view
- Structured AI output generation
- Cloud-based file uploads
- Responsive UI

---

# Tech Stack

## Frontend
- React.js
- Next.js App Router
- TypeScript
- Tailwind CSS
- Zustand
- Socket.IO Client

---

## Backend
- Node.js
- Next.js API Routes
- TypeScript

---

## Database & Queue
- MongoDB
- Redis (Upstash)
- BullMQ

---

## AI & File Services
- Gemini API
- Cloudinary

---

## Real-Time Communication
- Socket.IO
- WebSockets

---

# Architecture Overview

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
 ┌───────────────┐
 │ Gemini AI API │
 └───────────────┘
        │
        ▼
MongoDB Stores Result
        │
        ▼
Socket.IO emits update
        │
        ▼
Frontend receives real-time status

---

# Project Structure

```bash
app/
│
├── assignments/
│   ├── page.tsx
│   └── [id]/page.tsx
│
├── createassignment/
│   └── page.tsx
│
├── api/
│   └── assignment/
│       ├── create/route.ts
│       └── [id]/route.ts
│
├── navbar/
│   └── page.tsx
│
├── sidebar/
│   └── page.tsx
│
lib/
│
├── db.ts
├── queue.ts
├── socket.ts
│
services/
│
└── generatePaper.ts
│
store/
│
└── assignmentStore.ts
│
worker.ts

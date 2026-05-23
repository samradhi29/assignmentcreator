"use client";

import { io, Socket } from "socket.io-client";

const SOCKET_URL = "https://assignmentcreator-3.onrender.com";

export const socket: Socket = io(SOCKET_URL);
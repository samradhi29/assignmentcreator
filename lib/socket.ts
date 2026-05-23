"use client";

import { io, Socket } from "socket.io-client";



export const socket: Socket = io(process.env.SOCKET_URL);
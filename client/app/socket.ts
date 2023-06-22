import { io } from 'socket.io-client';

export const socket = io('ws:http://localhost:8080/ws', {
  autoConnect: false,
  addTrailingSlash: false
})

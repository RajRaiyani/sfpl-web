import { io, Socket } from 'socket.io-client';
import { serverDetails } from '@/config/vars';
import { getAuthToken } from '@/lib/auth-storage';

let socket: Socket | null = null;

if (typeof window !== 'undefined') {
  const token = getAuthToken();
  
  socket = io(serverDetails.socketPath, {
    transports: ['websocket'],
    withCredentials: true,
    autoConnect: true,
    auth: {
      token: `Bearer ${token}` || "",
    },
  });
}

export default socket;
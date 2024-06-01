import { io } from 'socket.io-client';
import { BaseSeverUrl } from '../constant/baseSeverUrl';
export const socket = io.connect(BaseSeverUrl, { reconnection: false });

import {SOCKET_URL} from '@/src/constants/config';
import {PropsWithChildren, createContext, memo, useCallback, useContext, useEffect, useRef, useState} from 'react';
import {Socket, io} from 'socket.io-client';
import {useAuth} from './authContext';

type SocketContextType = {
	socket: Socket | null;
	isConnected: boolean;
	connectSocket: () => void;
	disconnectSocket: () => void;
};

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export function useSocket() {
	const context = useContext(SocketContext);
	if (!context) {
		throw new Error('useSocket must be wrapped in a <SocketProvider />');
	}
	return context;
}

const SocketContextProvider: React.FC<PropsWithChildren> = ({children}) => {
	const {user, accessToken} = useAuth();
	const [socket, setSocket] = useState<Socket | null>(null);
	const [isConnected, setIsConnected] = useState(false);

	// Keep the latest token available to the socket
	const tokenRef = useRef(accessToken);

	useEffect(() => {
		tokenRef.current = accessToken;
	}, [accessToken]);

	const connectSocket = useCallback(() => {
		if (!accessToken) return;
		console.log("connect Socket call")
		console.log(socket?.connected)
		// Prevent duplicate connections
		if (socket?.connected) return;

		const newSocket = io(SOCKET_URL, {
			autoConnect: false,

			auth: (callback) => {
				callback({
					token: tokenRef.current,
				});
			},

			reconnection: true,
			reconnectionAttempts: Infinity,
			reconnectionDelay: 1000,
			reconnectionDelayMax: 5000,
		});

		newSocket.on('connect', () => {
			console.log('Socket connected:', newSocket.id);
			setIsConnected(true);
		});

		newSocket.on('disconnect', (reason) => {
			console.log('Socket disconnected:', reason);
			setIsConnected(false);
		});

		newSocket.on('connect_error', (error) => {
			console.log('Socket connection error:', error.message);
			setIsConnected(false);
		});

		setSocket(newSocket);
		newSocket.connect();
	}, [accessToken]);

	const disconnectSocket = useCallback(() => {
		if (!socket) return;

		socket.disconnect();
		socket.removeAllListeners();
		setSocket(null);
		setIsConnected(false);
	}, [socket]);

	// Connect when authenticated
	useEffect(() => {
		if (accessToken) {
			connectSocket();
		} else {
			disconnectSocket();
		}
	}, [accessToken]);

	return (
		<SocketContext.Provider value={{socket, isConnected, connectSocket, disconnectSocket}}>
			{children}
		</SocketContext.Provider>
	);
};

export const SocketProvider = memo(SocketContextProvider);

import {SOCKET_URL} from '@/src/constants/config';
import {PropsWithChildren, createContext, memo, useCallback, useContext, useEffect, useMemo, useState} from 'react';
import {Socket, io} from 'socket.io-client';
import {useAuth} from './authContext';

const SocketContext = createContext<{
	socket: Socket | null;
	connectSocket: (userId: number) => void;
	disconnectSocket: () => void;
}>({
	socket: null,
	connectSocket: () => null,
	disconnectSocket: () => null,
});

// Use this hook to access the user info.
export function useSocket() {
	const value = useContext(SocketContext);
	if (!value) {
		throw new Error('useSocket must be wrapped in a <SocketProvider />');
	}

	return value;
}

const SocketContextProvider: React.FC<PropsWithChildren> = ({children}) => {
	const {user} = useAuth();
	const [socket, setSocket] = useState<Socket | null>(null);

	const connectSocket = useCallback((userId: number) => {
		if (!socket) {
			const newSocket = io(SOCKET_URL);
			newSocket.on('connect', () => {
				console.log('Socket Connected');
				newSocket?.emit('joinRoom', userId);
			});
			newSocket.on('disconnect', () => {
				console.log('Socket disconnected');
			});
			newSocket.on('error', (error) => {
				console.error('Socket error:', error);
			});
			setSocket(newSocket);
		}
		// eslint-disable-next-line
	}, []);

	const disconnectSocket = useCallback(() => {
		if (!user || !socket) return;
		console.log(socket);
		socket.emit('leaveRoom', user.user_id);
		socket.disconnect();
		console.log('socket Disconnected');
		setSocket(null);
	}, [socket, user]);

	useEffect(() => {
		if (!user) return;
		if (user.user_id) {
			connectSocket(user.user_id);
		}
	}, [user]);

	const values = useMemo(
		() => ({
			socket,
			connectSocket,
			disconnectSocket,
		}),
		[socket, connectSocket, disconnectSocket]
	);
	return <SocketContext.Provider value={values}>{children}</SocketContext.Provider>;
};

export const SocketProvider = memo(SocketContextProvider);

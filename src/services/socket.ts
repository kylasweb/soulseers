import { io, Socket } from 'socket.io-client';
import { ChatMessage, Notification, Session } from '@/types';
import { useSocialStore } from '@/store';

class SocketService {
  private socket: Socket | null = null;
  private userId: string | null = null;

  constructor() {
    this.socket = null;
  }

  connect(userId: string) {
    this.userId = userId;
    this.socket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:3001', {
      auth: { userId },
      transports: ['websocket'],
    });

    this.setupListeners();
  }

  private setupListeners() {
    if (!this.socket) return;

    // Chat events
    this.socket.on('chat:message', this.handleNewMessage);
    this.socket.on('chat:typing', this.handleTyping);
    this.socket.on('chat:read', this.handleMessageRead);

    // Session events
    this.socket.on('session:update', this.handleSessionUpdate);
    this.socket.on('session:end', this.handleSessionEnd);

    // Notification events
    this.socket.on('notification:new', this.handleNewNotification);

    // Connection events
    this.socket.on('connect', () => {
      console.log('Connected to socket server');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from socket server');
    });
  }

  // Chat methods
  sendMessage(message: Omit<ChatMessage, 'id' | 'status' | 'createdAt'>) {
    if (!this.socket) return;
    this.socket.emit('chat:message', message);
  }

  sendTyping(sessionId: string, isTyping: boolean) {
    if (!this.socket) return;
    this.socket.emit('chat:typing', { sessionId, isTyping });
  }

  markMessageAsRead(messageId: string) {
    if (!this.socket) return;
    this.socket.emit('chat:read', { messageId });
  }

  // Session methods
  joinSession(sessionId: string) {
    if (!this.socket) return;
    this.socket.emit('session:join', { sessionId });
  }

  leaveSession(sessionId: string) {
    if (!this.socket) return;
    this.socket.emit('session:leave', { sessionId });
  }

  updateSessionStatus(sessionId: string, status: Session['status']) {
    if (!this.socket) return;
    this.socket.emit('session:update', { sessionId, status });
  }

  // Event handlers
  private handleNewMessage = (message: ChatMessage) => {
    // Implement message handling logic
    console.log('New message received:', message);
    // Update UI or state as needed
  };

  private handleTyping = ({ sessionId, userId, isTyping }: { sessionId: string; userId: string; isTyping: boolean }) => {
    // Implement typing indicator logic
    console.log(`User ${userId} is ${isTyping ? 'typing' : 'not typing'} in session ${sessionId}`);
  };

  private handleMessageRead = ({ messageId }: { messageId: string }) => {
    // Update message status in UI
    console.log(`Message ${messageId} was read`);
  };

  private handleSessionUpdate = (session: Session) => {
    // Update session state in UI
    console.log('Session updated:', session);
  };

  private handleSessionEnd = (sessionId: string) => {
    // Handle session end
    console.log('Session ended:', sessionId);
  };

  private handleNewNotification = (notification: Notification) => {
    // Add notification to store
    const { addNotification } = useSocialStore.getState();
    addNotification(notification);
  };

  // Cleanup
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}

export const socketService = new SocketService(); 
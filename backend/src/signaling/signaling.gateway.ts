import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  namespace: 'signaling',
})
export class SignalingGateway {
  @WebSocketServer()
  server: Server;

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  handleConnection(client: Socket) {
    console.log(`Client connected : ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected : ${client.id}`);
  }

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(client: Socket, room: string) {
    client.join(room);

    const rooms = (await this.cacheManager.get('rooms')) || {};
    if (!rooms[room]) {
      rooms[room] = [];
    }

    const participants = new Set(rooms[room]);
    participants.add(client.id);
    rooms[room] = Array.from(participants);

    await this.cacheManager.set('rooms', rooms);

    client.to(room).emit('userJoined', { userId: client.id });

    return {
      roomId: room,
      userId: client.id,
      participants: Array.from(participants),
    };
  }

  @SubscribeMessage('offer')
  handleOffer(
    client: Socket,
    data: { room: string; offer: RTCSessionDescriptionInit },
  ) {
    client.to(data.room).emit('offer', {
      offer: data.offer,
      userId: client.id,
    });
  }

  @SubscribeMessage('answer')
  handleAnswer(
    client: Socket,
    data: { room: string; answer: RTCLocalSessionDescriptionInit },
  ) {
    client.to(data.room).emit('answer', {
      answer: data.answer,
      userId: client.id,
    });
  }

  @SubscribeMessage('iceCandidate')
  handleIceCandidate(
    client: Socket,
    data: { room: string; candidate: RTCIceCandidateInit },
  ) {
    client.to(data.room).emit('iceCandidate', {
      candidate: data.candidate,
      userId: client.id,
    });
  }

  @SubscribeMessage('getRoomInfo')
  async getRoomInfo(client: Socket, room: string) {
    const rooms = (await this.cacheManager.get('rooms')) || {};
    return {
      roomId: room,
      participants: rooms[room] || [],
    };
  }
}

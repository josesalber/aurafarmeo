import { Client, type IMessage, type StompSubscription } from '@stomp/stompjs';
import { WS_URL } from '../../lib/constants';
import type { BattleEvent, BattleEventHandler, ChatEventHandler } from '../../types/websocket';

type Unsubscribe = () => void;

class WebSocketClient {
  private client: Client | null = null;

  connect(onStatus?: (connected: boolean) => void) {
    this.client = new Client({
      brokerURL: WS_URL,
      reconnectDelay: 3000,
      heartbeatIncoming: 10000,
      heartbeatOutgoing: 10000,
      onConnect: () => onStatus?.(true),
      onDisconnect: () => onStatus?.(false),
      onStompError: () => onStatus?.(false),
      onWebSocketClose: () => onStatus?.(false),
    });
    this.client.activate();
  }

  disconnect() {
    void this.client?.deactivate();
    this.client = null;
  }

  subscribe<T>(destination: string, handler: (payload: T) => void): Unsubscribe {
    if (!this.client?.connected) return () => undefined;
    const subscription: StompSubscription = this.client.subscribe(destination, (message: IMessage) => {
      handler(JSON.parse(message.body) as T);
    });
    return () => subscription.unsubscribe();
  }

  publish<T>(destination: string, body: T) {
    this.client?.publish({ destination, body: JSON.stringify(body) });
  }

  subscribeToBattle(battleId: string, handler: BattleEventHandler): Unsubscribe {
    return this.subscribe<BattleEvent>(`/topic/battles/${battleId}`, handler);
  }

  subscribeToChat(battleId: string, handler: ChatEventHandler): Unsubscribe {
    return this.subscribe(`/topic/battles/${battleId}/chat`, handler);
  }

  sendChatMessage(battleId: string, username: string, message: string) {
    this.publish(`/app/battles/${battleId}/chat`, { username, message });
  }
}

export const websocketClient = new WebSocketClient();

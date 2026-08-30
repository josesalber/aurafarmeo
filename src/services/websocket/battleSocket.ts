import { websocketClient } from './websocketClient';
import type { BattleEventHandler, ChatEventHandler } from '../../types/websocket';

export const battleSocket = {
  connect: websocketClient.connect.bind(websocketClient),
  disconnect: websocketClient.disconnect.bind(websocketClient),
  subscribeToBattle: (battleId: string, handler: BattleEventHandler) => websocketClient.subscribeToBattle(battleId, handler),
  subscribeToChat: (battleId: string, handler: ChatEventHandler) => websocketClient.subscribeToChat(battleId, handler),
  sendChatMessage: (battleId: string, username: string, message: string) =>
    websocketClient.sendChatMessage(battleId, username, message),
};

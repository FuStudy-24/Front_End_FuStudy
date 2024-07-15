// types.ts
export interface Conversation {
    id: number;
    user1Id: number;
    user2Id: number;
    createAt: string;
    endTime: string;
    lastMessage: string;
    duration: string;
    isClose: boolean;
  }
  
  export interface Message {
    id: number;
    conversationId: number;
    senderId: number;
    content: string;
    createdAt: string;
  }
  
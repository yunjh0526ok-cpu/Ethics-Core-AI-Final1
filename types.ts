export enum Role {
  USER = 'user',
  MODEL = 'model',
  SYSTEM = 'system'
}

export type BotMode = 'COUNCILOR' | 'PUBLIC_INSTITUTION' | 'UNIVERSITY';

export interface ActionButton {
  label: string;
  value: string;
  type: 'primary' | 'secondary';
}

export interface Message {
  id: string;
  role: Role;
  text: string;
  timestamp: Date;
  isError?: boolean;
  actions?: ActionButton[]; // Added for interactive buttons
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  mode: BotMode | null;
}

export const ECA_COLORS = {
  primary: '#06b6d4', // Cyan 500
  secondary: '#0f172a', // Slate 900
  accent: '#22d3ee', // Cyan 400
  warning: '#EF4444', // Red 500
  darkBg: '#020617', // Slate 950
  cardBg: 'rgba(30, 41, 59, 0.7)', // Slate 800 with opacity
};
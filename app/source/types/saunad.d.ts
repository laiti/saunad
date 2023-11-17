export interface SaunaData {
  [key: string]: { start?: Date; end?: Date; rounds?: number };
}

export interface MessageData {
  text: string;
  date: number;
  username: string;
}

export interface CommandData {
  start: boolean;
  users: string[];
  date: Date;
  rounds?: number;
}

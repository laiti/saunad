export interface SaunaData {
    [key: string]: { start: Date, end: Date};
  }
  
  export interface MessageData {
    text: string;
    date: number;
    username: string;
    command: string;
  }
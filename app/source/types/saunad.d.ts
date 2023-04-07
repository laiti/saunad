export interface SaunaData {
    [key: string]: { start: Date|undefined, end: Date|undefined, rounds: number|undefined};
  }
  
  export interface MessageData {
    text: string;
    date: number;
    username: string;
    command: string;
  }
export interface Log {
    applyId: number;
    name: string;
    startDate: string;
    step: number;
    stepComment: string;
  }
  
  export type Logs = Log[];
  
  export interface LogsResponse {
    logs: Logs;
  }
export interface CompletedDocument {
    id: number;
    name: string;
    url: string;
  }
  
  export interface RemainingStep {
    id: number;
    content: string;
  }
  
  export interface DocumentDetail {
    name: string;
    startDate: string;
    step: number;
    completedDocuments: CompletedDocument[];
    remainingSteps: RemainingStep[];
    stepComment: string;
    announcementId: number;
  }
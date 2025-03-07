export interface Service {
    id: number;
    name: string;
    description: string;
    fk_category: number;
    createdAt: string | null;
    updatedAt: string | null; 
  }
export interface Service {
    id: number;
    name: string;
    description: string;
    fk_category: string;
    createdAt: string | null;
    updatedAt: string | null; 
  }
export interface Service {
    pkService: number;
    name: string;
    description: string;
    fk_category: string;
    fkClientType: number,
    fkServiceType: number,
    status: number,  
    createdAt: string | null;
    updatedAt: string | null; 
  }

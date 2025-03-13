export interface Service {
    id: number;
    name: string;
    description: string;
    fk_category: string;
    category: Category;
    createdAt: string | null;
    updatedAt: string | null; 
  }
interface Category {
    id: number;
    name: string;
    createdAt: string | null;
    updatedAt: string | null; 
  }
import { SubCategory } from "./subCategory";
import { ClientType } from "./clientType";
import { ServiceType } from "./serviceType";

export interface Service {
  pkService: number;
  name: string;
  description: string;
  status: number;
  createdAt: string | null;
  updatedAt: string | null;
  fkSubCategory: number;
  subCategory: SubCategory;
  clientType: ClientType;
  serviceType: ServiceType;
}

  
  
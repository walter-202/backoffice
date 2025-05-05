import { User } from "./user";

export interface RequestService {
  requestId: number;
  serviceType: number;
  serviceDescription: string;
  address: string;
  latitude: number;
  longitude: number;
  status: number;
  fkUser: User;
  createdAt: string | null;
  updatedAt: string | null;
}

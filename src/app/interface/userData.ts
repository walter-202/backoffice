export interface User {
  id: number;
  username: string;
  email: string;
  validate_email: number; 
  phone: string | null; 
  validate_phone: number; 
  password: string;
  confirmPassword?: string; 
  fk_profile: string;
  fk_person: string;
  status: number; 
  createdAt: string;
  updatedAt: string;
  person: Person;
  profile: Profile;
}

interface Person {
  id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  address: string;
  date_of_birth: string | null; 
  phone: string | null; 
  updatedAt: string;
}

interface Profile {
  id: number;
  name: string;
  role: number;
  createdAt: string | null;
  updatedAt: string | null; 
}
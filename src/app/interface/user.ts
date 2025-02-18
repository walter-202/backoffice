export interface User {
    id: number;
    username: string;
    email: string;
    validate_email: number;
    phone: string;
    validate_phone: number;
    fk_profile: number;
    fk_person: number;
    status: number;
  }
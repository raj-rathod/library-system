export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface UserRequestDTO {
  name: string;
  email: string;
  role: string;
  password:string
}



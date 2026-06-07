export enum Status {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}

export interface Department {
  id: number;
  name: string;
  status: Status;
}
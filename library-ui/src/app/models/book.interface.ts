export enum BookStatus {
  AVAILABLE = 'AVAILABLE',
  UNAVAILABLE = 'UNAVAILABLE',
  ARCHIVED = 'ARCHIVED'
}

export interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  quantity: number;
  status: BookStatus;
  departmentId: number;
  departmentName: string;
}
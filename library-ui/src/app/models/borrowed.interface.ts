export enum BorrowStatus {
  REQUESTED = 'REQUESTED',
  APPROVED = 'APPROVED',
  BORROWED = 'BORROWED',
  RETURNED = 'RETURNED',
  OVERDUE = 'OVERDUE',
  REJECTED = 'REJECTED'
}

export interface Borrow {
  id: number;
  userId: number;
  bookId: number;
  quantity:number;
  borrowDate: string;
  returnDate: string;
  status: BorrowStatus;
}
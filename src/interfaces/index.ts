export interface taskInterface {
  title: string;
  description: string;
  status: 'open' | 'in progress' | 'done';
  category: 'work' | 'hobby' | 'personal';
  dateToStart: string;
  dateToFinish: string;
  reference: string;
  priority: 'low' | 'medium' | 'high';
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
}

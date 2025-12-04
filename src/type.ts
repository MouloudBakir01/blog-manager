export interface Article {
  id: string;           // string pour simplicité (uuid-like)
  title: string;
  category: string;
  content: string;
  author: string;
  createdAt: string;    // ISO string
}

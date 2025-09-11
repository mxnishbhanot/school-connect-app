export interface Album {
  id: string;
  title: string;
  description?: string;
  createdBy: string;
  createdAt: Date;
  photos: string[];
}

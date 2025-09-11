export interface Announcement {
  id: string;
  message: string;
  date: Date;
  createdBy: string;
  targetAudience: string[];
}

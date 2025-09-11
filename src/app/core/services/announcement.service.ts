import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Announcement } from '../../models/announcement.model';

@Injectable({ providedIn: 'root' })
export class AnnouncementService {
  private announcementsSubject = new BehaviorSubject<Announcement[]>([]);
  announcements$ = this.announcementsSubject.asObservable();

  setAnnouncements(announcements: Announcement[]) {
    this.announcementsSubject.next(announcements);
  }

  addAnnouncement(announcement: Announcement) {
    const current = this.announcementsSubject.value;
    this.announcementsSubject.next([...current, announcement]);
  }

  removeAnnouncement(id: string) {
    this.announcementsSubject.next(this.announcementsSubject.value.filter(a => a.id !== id));
  }
}

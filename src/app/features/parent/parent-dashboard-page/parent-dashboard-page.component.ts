import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-parent-dashboard-page',
  templateUrl: './parent-dashboard-page.component.html',
  styleUrls: ['./parent-dashboard-page.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class ParentDashboardPageComponent {
  tab: 'homework' | 'gallery' | 'announcements' = 'homework';

  // Homework
  homeworkFilter: 'week' | 'all' = 'week';
  homeworkList = [
    { subject: 'Math', task: 'Algebra worksheet', attachment: 'math.pdf', date: '2025-09-11' },
    { subject: 'Science', task: 'Volcano model', attachment: '', date: '2025-09-10' },
    { subject: 'English', task: 'Essay writing', attachment: 'essay.docx', date: '2025-09-07' }
  ];

  get filteredHomework() {
    if (this.homeworkFilter === 'week') {
      // Filter for this week (last 7 days)
      const today = new Date();
      return this.homeworkList.filter(hw => {
        const hwDate = new Date(hw.date);
        return (today.getTime() - hwDate.getTime())/(1000*60*60*24) <= 7;
      });
    }
    return this.homeworkList;
  }

  // Gallery
  albums = [
    { event: 'Sports Day', date: '2025-09-01', photos: ['photo1.jpg', 'photo2.jpg'] },
    { event: 'Annual Function', date: '2025-08-15', photos: ['photo3.jpg'] }
  ];
  selectedAlbum: any = null;
  selectAlbum(album: any) { this.selectedAlbum = album; }
  closeAlbum() { this.selectedAlbum = null; }

  // Announcements/Calendar
  calendarDays = Array.from({length: 30}, (_, i) => i + 1);
  holidays = [
    { date: '2025-09-15', label: 'School Holiday' },
    { date: '2025-09-20', label: 'Sports Event' }
  ];
  events = [
    { date: '2025-09-12', label: 'PTM' },
    { date: '2025-09-18', label: 'Art Competition' }
  ];
}

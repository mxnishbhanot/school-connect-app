import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Homework } from '../../models/homework.model';

@Injectable({ providedIn: 'root' })
export class HomeworkService {
  private homeworkSubject = new BehaviorSubject<Homework[]>([]);
  homework$ = this.homeworkSubject.asObservable();

  setHomework(homework: Homework[]) {
    this.homeworkSubject.next(homework);
  }

  addHomework(hw: Homework) {
    const current = this.homeworkSubject.value;
    this.homeworkSubject.next([...current, hw]);
  }

  removeHomework(id: string) {
    this.homeworkSubject.next(this.homeworkSubject.value.filter(hw => hw.id !== id));
  }
}

import { Component, Input } from '@angular/core';
import { Task } from '../../core/types/models';
import { CommonModule, DatePipe } from '@angular/common';
import { ShortenTextPipe } from '../../core/pipes/shorten-text.pipe';

@Component({
  selector: 'app-task-card',
  imports: [DatePipe, ShortenTextPipe, CommonModule],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss'
})
export class TaskCardComponent {

  @Input() task!:Task

  getPriorityClass(priority: string): string {
    switch (priority.toLowerCase()) {
      case 'მაღალი': return '#FA4D4D';
      case 'საშუალო': return '#FFBE0B';
      case 'დაბალი': return '#08A508';
      default: return '#08A508';
    }
  }

  applyPriorityColor(priority: string): string {
    switch (priority.toLowerCase()) {
      case 'მაღალი': return '#FA4D4D';
      case 'საშუალო': return '#FFBE0B';
      case 'დაბალი': return '#08A508';
      default: return '#08A508';
    }
  }
}

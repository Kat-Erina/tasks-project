import { Component, Input } from '@angular/core';
import { Task } from '../../core/types/models';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-task-item',
  imports: [DatePipe],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss'
})
export class TaskItemComponent {

  @Input() task!:Task
}

import { Component, Input } from '@angular/core';
import { Task } from '../../types/models';
import { TaskItemComponent } from '../../../tasks/task-item/task-item.component';

@Component({
  selector: 'app-task-column',
  imports: [TaskItemComponent],
  templateUrl: './task-column.component.html',
  styleUrl: './task-column.component.scss'
})
export class TaskColumnComponent {
@Input() header=''
@Input() color=''
@Input() data:Task[]=[]


  toggle(event:Event){
    const target=event.target as HTMLHeadingElement;
    const sibling=target.nextSibling as HTMLDivElement;
    if(sibling){
      const isExpanded = sibling.style.maxHeight;
      if (isExpanded) {
        sibling.style.maxHeight = '';
      } else {
        sibling.style.maxHeight = sibling.scrollHeight + 'px';
      }
    }
  }
}

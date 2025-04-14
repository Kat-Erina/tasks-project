import { Component, ElementRef, inject, Input, signal, ViewChild } from '@angular/core';
import { Task } from '../../types/models';
import { TaskItemComponent } from '../../../tasks/task-item/task-item.component';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

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
apiService=inject(ApiService)
router=inject(Router)
 
navigateToItem(id:number){
  this.router.navigate(['/task', id])
}



}

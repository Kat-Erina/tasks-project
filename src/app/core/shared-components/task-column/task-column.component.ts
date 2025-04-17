import { AfterViewChecked, Component, ElementRef, inject, Input, signal, ViewChild } from '@angular/core';
import { Task } from '../../types/models';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { TaskCardComponent } from '../../../tasks/task-card/task-card.component';

@Component({
  selector: 'app-task-column',
  imports: [TaskCardComponent, CommonModule],
  templateUrl: './task-column.component.html',
  styleUrl: './task-column.component.scss'
})
export class TaskColumnComponent implements AfterViewChecked{
@Input() header=''
@Input() color=''
@Input() data:Task[]=[]
isExpanded = signal(false);
apiService=inject(ApiService)
router=inject(Router)
@ViewChild('content') content!: ElementRef;
contentHeight=signal(0)
 
navigateToItem(id:number){
  this.router.navigate(['/task', id])
}


toggleExpand() {
  this.isExpanded.set(!this.isExpanded()) ;

  if (this.isExpanded() && this.data) {
   this.contentHeight.set(this.content.nativeElement.scrollHeight);
  } else {
    this.contentHeight.set(0)
  }
}

ngAfterViewChecked(): void {
    if (this.content?.nativeElement) {
      this.contentHeight.set(this.content.nativeElement.scrollHeight);
    }
}


}

import { Component, inject, input,  OnInit, signal,   } from '@angular/core';
import { ApiService } from '../core/services/api.service';
import {  Status, Task } from '../core/types/models';
import { CommonModule } from '@angular/common';
import { CommentAreaComponent } from "../core/shared-components/comment-area/comment-area.component";
import { CommentItemComponent } from "../core/shared-components/comment-item/comment-item.component";

@Component({
  selector: 'app-task',
  imports: [CommonModule, CommentAreaComponent, CommentItemComponent],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent implements OnInit {
apiService=inject(ApiService)
id=input.required<number>()
item:Task|undefined=undefined
statuses=signal<Status[]>([])
isVisible=signal(false)
chosenStatus=signal<Status|null>(null)
comments=this.apiService.comments;
date:Date|string=''
 day = signal('');
 month =signal('');
 year!:number;
 formattedDate = signal('');
 weekDay=signal('')

 daysObj: { [key: number]: string } = {
  0: 'კვი',  
  1: 'ორშ',  
  2: 'სამ',  
  3: 'ოთხ',  
  4: 'ხუთ',  
  5: 'პარ',  
  6: 'შაბ'   
};

 ngOnInit(): void {
   this.loadData()
   this.apiService.getAllcomments(this.id())
 }



 loadData(){
  this.apiService.getItemInfo(this.id()).subscribe({
    next:response=>{
this.item=response;
this.chosenStatus.set(this.item.status)
this.date=new Date(this.item.due_date)
this.day.set(String(this.date.getDate()).padStart(2, '0'))
this.month.set(String(this.date.getMonth() + 1).padStart(2, '0')) 
this.year = this.date.getFullYear();
this.formattedDate.set( `${this.day()}/${this.month()}/${this.year}`);
this.weekDay.set(this.daysObj[this.date.getDay()])
    }
  })
  this.getStatuses()
}

  getStatuses(){
    this.apiService.getStatuses().subscribe({
      next:response=>this.statuses.set(response),
      error:error=>console.log(error)
    })
}

chooseStatus(status:Status){
this.chosenStatus.set(status)
this.apiService.updateTaskstatus(this.id(), {'status_id':this.chosenStatus()?.id}).subscribe({
    next:response=>{if(response)this.isVisible.set(false)
    },
    error:error=>console.log(error)
  })
}

get commentsLength() {
  let total = 0;

  for (let comment of this.comments()) {
    total += 1; // count the main comment itself
    total += comment.sub_comments.length; // count its subcomments
  }

  return total;
}



}

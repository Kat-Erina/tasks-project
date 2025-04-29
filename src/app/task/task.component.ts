import { Component, DestroyRef, inject, input,  OnInit, signal,   } from '@angular/core';
import { ApiService } from '../core/services/api.service';
import {  Status, Task } from '../core/types/models';
import { CommonModule } from '@angular/common';
import { CommentAreaComponent } from "../core/shared-components/comment-area/comment-area.component";
import { CommentItemComponent } from "../core/shared-components/comment-item/comment-item.component";
import { ShortenTextPipe } from '../core/pipes/shorten-text.pipe';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-task',
  imports: [CommonModule, CommentAreaComponent, CommentItemComponent, ShortenTextPipe, 
    MatProgressSpinnerModule
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent implements OnInit {
apiService=inject(ApiService)
destroyRef=inject(DestroyRef)
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
taskError=signal(false)
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
 let sub= this.apiService.getItemInfo(this.id()).subscribe({
    next:response=>{
this.item=response;
this.chosenStatus.set(this.item.status)
this.date=new Date(this.item.due_date)
this.day.set(String(this.date.getDate()).padStart(2, '0'))
this.month.set(String(this.date.getMonth() + 1).padStart(2, '0')) 
this.year = this.date.getFullYear();
this.formattedDate.set( `${this.day()}/${this.month()}/${this.year}`);
this.weekDay.set(this.daysObj[this.date.getDay()])
    },
    error:()=>this.taskError.set(true)
  })
  this.getStatuses()

  this.destroyRef.onDestroy(()=>{
    sub.unsubscribe()
  })
}

  getStatuses(){
   let sub=this.apiService.getStatuses().subscribe({
      next:response=>this.statuses.set(response),
      error:error=>console.log(error)
    })

    this.destroyRef.onDestroy(()=>{
      sub.unsubscribe()
    })
}

chooseStatus(status:Status){
this.chosenStatus.set(status)
let sub=this.apiService.updateTaskstatus(this.id(), {'status_id':this.chosenStatus()?.id}).subscribe({
    next:response=>{if(response)this.isVisible.set(false)
    },
    error:error=>console.log(error)
  })

  this.destroyRef.onDestroy(()=>{
    sub.unsubscribe()
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



getPriorityClass(priority: string): string {
  switch (priority.toLowerCase()) {
    case 'მაღალი': return '#FA4D4D';
    case 'საშუალო': return '#FFBE0B';
    case 'დაბალი': return '#08A508';
    default: return '#08A508';
  }
}

applyBorder(priority: string): string {
  switch (priority.toLowerCase()) {
    case 'დასაწყები': return '#FFBE0B';
    case 'პროგრესში': return '#FB5607';
    case 'მზად ტესტირებისთვის': return '#FF006E';
    case 'დასრულებული': return '#3A86FF';
    default: return '#FFBE0B';
  }
  
}


applyBgc(dep:string):string{
  switch(dep){
    case 'ადმინისტრაციის დეპარტამენტი': return '#89B6FF'
    case 'ადამიანური რესურსების მართვის დეპარტამენტი': return '#FD9A6A'
    case 'ფინანსების დეპარტამენტი': return '#FFD86D'
    case 'გაყიდვები და მარკეტინგის დეპარტამენტი': return '#FF66A8'
    case 'ლოჯოსტიკის დეპარტამენტი': return '#89B6FF'
    case 'ტექნოლოგიების დეპარტამენტი': return '#FFD86D'
    case 'მედიის დეპარტამენტი': return '#FD9A6A'
    case 'დიზაინერების დეპარტამენტი': return '#FF66A8'

    default: return '#FD9A6A'
  }
}



}

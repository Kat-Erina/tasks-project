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
    switch (priority) {
      case 'მაღალი': return '#FA4D4D';
      case 'საშუალო': return '#FFBE0B';
      case 'დაბალი': return '#08A508';
      default: return '#08A508';
    }
  }

  applyBorder(priority: string): string {
    switch (priority) {
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

  ngOnInit(){
  console.log(this.applyBgc('ადმინისტრაციის დეპარტმანეტი'))  
  }
}

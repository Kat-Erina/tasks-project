import { Component, inject, input,  OnInit, signal,  } from '@angular/core';
import { ApiService } from '../core/services/api.service';
import { Status, Task } from '../core/types/models';
import { DropdownComponent } from "../core/shared-components/dropdown/dropdown.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item',
  imports: [CommonModule],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss'
})
export class ItemComponent implements OnInit {
apiService=inject(ApiService)

id=input.required<number>()
item:Task|undefined=undefined
statuses=signal<Status[]>([])
isVisible=signal(false)
chosenStatus=signal<Status|null>(null)
 ngOnInit(): void {
   console.log(this.id())
   this.loadData()
 }



 loadData(){
  this.apiService.getItemInfo(this.id()).subscribe({
    next:response=>{console.log(response)
      this.item=response;
      this.chosenStatus.set(this.item.status)
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
  console.log(status)
  this.chosenStatus.set(status)

  this.apiService.updateTaskstatus(this.id(), {'status_id':this.chosenStatus()?.id}).subscribe({
    next:response=>{if(response)this.isVisible.set(false)

    },
    
    error:error=>console.log(error)
  })


}
}

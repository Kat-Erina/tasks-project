import { Component, inject, OnInit, signal } from '@angular/core';
import { LiComponent } from '../core/shared-components/li/li.component';
import { SharedStates } from '../core/services/sharedStates.service';
import { FilteringCriteriasComponent } from '../core/shared-components/filtering-criterias/filtering-criterias.component';
import { ApiService } from '../core/services/api.service';

@Component({
  selector: 'app-tasks',
  imports: [LiComponent, FilteringCriteriasComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent implements OnInit {
sharedStatesService=inject(SharedStates)
apiService=inject(ApiService)
// sth=signal<undefined|Event>(undefined)
isOpen=signal(false)

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

loadAllTasks(){
  this.apiService.getTasks().subscribe({
    next:response=>{
      console.log(response)
    },
    error:error=>console.log(error)
  })
}

ngOnInit(): void {
  this.loadAllTasks()
}

}

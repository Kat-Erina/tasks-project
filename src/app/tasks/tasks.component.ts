import { Component, inject } from '@angular/core';
import { LiComponent } from '../core/shared-components/li/li.component';
import { SharedStates } from '../core/services/sharedStates.service';

@Component({
  selector: 'app-tasks',
  imports: [LiComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent {
sharedStatesService=inject(SharedStates)

toggle(){
  if(this.sharedStatesService.openFilteringCriterias()){
    this.sharedStatesService.openFilteringCriterias.set(false)
  } 
  else{this.sharedStatesService.openFilteringCriterias.set(!this.sharedStatesService.openFilteringCriterias())
  
  // this.sharedStatesService.openFilteringCriterias.set(!this.sharedStatesService.openFilteringCriterias())
}
 
  console.log(this.sharedStatesService.openFilteringCriterias())
}
}

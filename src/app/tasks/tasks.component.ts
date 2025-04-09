import { Component, inject, OnInit, signal } from '@angular/core';
import { LiComponent } from '../core/shared-components/li/li.component';
import { SharedStates } from '../core/services/sharedStates.service';
import { FilteringCriteriasComponent } from '../core/shared-components/filtering-criterias/filtering-criterias.component';
import { ApiService } from '../core/services/api.service';
import { TaskColumnComponent } from '../core/shared-components/task-column/task-column.component';
import { Employee, Priority, ReceivedEmployee, Task } from '../core/types/models';

@Component({
  selector: 'app-tasks',
  imports: [LiComponent, FilteringCriteriasComponent, TaskColumnComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent implements OnInit {
sharedStatesService=inject(SharedStates)
apiService=inject(ApiService)
priorities=signal<Priority[]>([])
employees=signal<ReceivedEmployee[]>([])


statuses=[{name:'დასაწყები', 
  color: '#F7BC30'
},{name:'პროგრესში', 
  color: '#FB5607'
}, {name:'მზად ტესტირებისთვის', 
  color: '#FF006E'
}, {name:'დასრულებული', 
  color: '#3A86FF'
}]

isOpen=signal(false)

ngOnInit(): void {
  this.apiService.getAllDepartments()
  this.apiService.getTasks()
  this.apiService.getPriorities().subscribe({
    next:response=>{
      this.priorities.set(response)
    },
    error:error=>console.log(error)
  })
  this.apiService.getEmployees().subscribe({
    next:response=>{
      this.employees.set(response)
    },
    error:error=>console.log(error)
  })
}

getTasksByStatus(status: string): Task[] {
  switch (status) {
    case 'დასაწყები':
      return this.apiService.toBeStartedTasks();
    case 'პროგრესში':
      return this.apiService.inProgressTasks();
    case 'მზად ტესტირებისთვის':
      return this.apiService.toBeTestedTasks();
    case 'დასრულებული':
      return this.apiService.finishedTasks();
    default:
      return [];
  }
}

getDataForChild(criteria:string){
  switch (criteria) {
    case 'departments':
      return this.apiService.departments();
    case 'priorities':
      return this.priorities();
    case 'employees':
      return this.employees();
   
    default:
      return [];
  }

}

}

import { Component, inject, OnInit, signal } from '@angular/core';
import { LiComponent } from '../core/shared-components/li/li.component';
import { SharedStates } from '../core/services/sharedStates.service';
import { FilteringCriteriasComponent } from '../core/shared-components/filtering-criterias/filtering-criterias.component';
import { ApiService } from '../core/services/api.service';
import { TaskColumnComponent } from '../core/shared-components/task-column/task-column.component';
import { Department,  Priority, ReceivedEmployee, Task } from '../core/types/models';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-tasks',
  imports: [LiComponent, FilteringCriteriasComponent, TaskColumnComponent, MatProgressSpinnerModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent implements OnInit {
sharedStatesService=inject(SharedStates)
apiService=inject(ApiService)
tasks=this.apiService.tasks
priorities=signal<Priority[]>([])
employees=signal<ReceivedEmployee[]>([])
chosenDepartment:Department[]|undefined=[]
toBeStartedTasks=this.apiService.toBeStartedTasks
toBeTestedTasks=this.apiService.toBeTestedTasks
inProgressTasks=this.apiService.inProgressTasks
finishedTasks=this.apiService.finishedTasks

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
chosenCriterias:{
  departments:Department[],
  priorities:Priority[],
  employees:ReceivedEmployee[]
}={departments:[],
  priorities:[],
  employees:[]
}

tasksAreLoading = this.apiService.tasksAreLoading;
taskLoadingHasError = this.apiService.taskLoadingHasError;

ngOnInit(): void {
  // localStorage.clear()
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


    let fetchedData=localStorage.getItem('criterias')
    if(fetchedData){
      let parsedCriterias=JSON.parse(fetchedData)
      this.apiService.chosenFilteringCriterias.set(parsedCriterias)
    }
  
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

removeItem(item:Department|ReceivedEmployee| Priority){
let updatedDepartments=this.apiService.chosenFilteringCriterias().departments?.filter((val)=>{return item.name!==val.name})
let updatedPriorities=this.apiService.chosenFilteringCriterias().priorities?.filter((val)=>{return item.name!==val.name})
let updatedPeople=this.apiService.chosenFilteringCriterias().employees?.filter((val)=>{return item.name!==val.name})

this.apiService.chosenFilteringCriterias.set({
  ...this.apiService.chosenFilteringCriterias(),
  departments: updatedDepartments,
  priorities: updatedPriorities,
  employees: updatedPeople
});

this.apiService.sortData()
localStorage.setItem('criterias', JSON.stringify(
  this.apiService.chosenFilteringCriterias()))
}

clearFilteringCriterias(){
  localStorage.removeItem('criterias')
  this.sharedStatesService.chosenFilteringCriterias.set({})
  this.apiService.sortData()
}

}

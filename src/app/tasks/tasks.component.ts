import { Component, inject, OnInit, signal } from '@angular/core';
import { LiComponent } from '../core/shared-components/li/li.component';
import { SharedStates } from '../core/services/sharedStates.service';
import { FilteringCriteriasComponent } from '../core/shared-components/filtering-criterias/filtering-criterias.component';
import { ApiService } from '../core/services/api.service';
import { TaskColumnComponent } from '../core/shared-components/task-column/task-column.component';
import { Department, Employee, Priority, ReceivedEmployee, Task } from '../core/types/models';
import { DecimalPipe } from '@angular/common';

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
chosenDepartment:Department[]|undefined=[]
chosenFilteringCriterias=this.sharedStatesService.chosenFilteringCriterias

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


    let fetchedData=localStorage.getItem('criterias')
    if(fetchedData){
      let parsedCriterias=JSON.parse(fetchedData)
      this.chosenFilteringCriterias.set(parsedCriterias)
    }
   console.log(this.chosenFilteringCriterias())
  
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

}

// filterTasks(tasks: Task[], criteria: any): Task[] {
//   return tasks.filter(task => {
//     const matchesDepartment = !criteria.departments?.length || criteria.departments.some(dep => dep.id === task.department.id);
//     const matchesPriority = !criteria.priorities?.length || criteria.priorities.some(pr => pr.id === task.priority.id);
//     const matchesEmployee = !criteria.employees?.length || criteria.employees.some(emp => emp.id === task.assignedTo.id);
//     return matchesDepartment && matchesPriority && matchesEmployee;
//   });
// }

// loadFilteredData(){
//   this.apiService.toBeStartedTasks().filter((item)=>{
//     item.department.id
//   })
// }

}

import { Injectable, signal } from "@angular/core";
import { Department,  ReceivedEmployee, Task } from "../types/models";

@Injectable({
    'providedIn':'root'
})

export class SharedStates{
openEmployeeModal=signal(false)
openFilteringCriterias=signal(false)
receivedVal=signal('')
chosenDepartment=signal<Department|undefined>(undefined)
filteredEmployees=signal<ReceivedEmployee[]>([])
employees=signal<ReceivedEmployee[]>([])

// tasks functionality
// tasks=signal<Task[]>([])
// toBeStartedTasks=signal<Task[]>([])
// inProgressTasks=signal<Task[]>([])
// toBeTestedTasks=signal<Task[]>([])
// finishedTasks=signal<Task[]>([])


}
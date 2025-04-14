import { computed, Injectable, signal } from "@angular/core";
import { Department,  Priority,  ReceivedEmployee, Task } from "../types/models";

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
chosenFilteringCriterias=signal<{
    departments?: Department[],
    priorities?: Priority[],
    employees?: ReceivedEmployee[]
}>({})

getValues = computed< (Department | Priority | ReceivedEmployee)[] >(() => {
    const { departments = [], priorities = [], employees = [] } = this.chosenFilteringCriterias();
  return [...departments, ...priorities, ...employees];
  });



}
import { Injectable, signal } from "@angular/core";
import { Department } from "../types/models";

@Injectable({
    'providedIn':'root'
})

export class SharedStates{
    openEmployeeModal=signal(false)
    openFilteringCriterias=signal(false)
    receivedVal=signal('')
chosenDepartment=signal<Department|undefined>(undefined)
}
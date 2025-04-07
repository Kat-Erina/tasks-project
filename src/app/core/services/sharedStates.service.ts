import { Injectable, signal } from "@angular/core";

@Injectable({
    'providedIn':'root'
})

export class SharedStates{
    openEmployeeModal=signal(false)
    openFilteringCriterias=signal(false)
    receivedVal=signal('')
}
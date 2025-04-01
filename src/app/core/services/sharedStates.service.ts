import { Injectable, signal } from "@angular/core";

@Injectable({
    'providedIn':'root'
})

export class SharedStates{
    openEmployeeModal=signal(true)
}
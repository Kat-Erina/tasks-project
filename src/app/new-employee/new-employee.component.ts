import { Component, inject } from '@angular/core';
import { SharedStates } from '../core/services/sharedStates.service';
import { InputComponent } from "../core/shared-components/input/input.component";
import { DropdownComponent } from "../core/shared-components/dropdown/dropdown.component";

@Component({
  selector: 'app-new-employee',
  imports: [InputComponent, DropdownComponent, DropdownComponent],
  templateUrl: './new-employee.component.html',
  styleUrl: './new-employee.component.scss'
})
export class NewEmployeeComponent {
sharedState=inject(SharedStates);

//reuirements



closeModal(event:Event){
  event.stopPropagation()
  
  this.sharedState.openEmployeeModal.set(false)
}
}

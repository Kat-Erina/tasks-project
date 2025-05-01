import { Component,    EventEmitter, inject, Input, Output, signal } from '@angular/core';
import { Department, Priority, ReceivedEmployee, Status } from '../../types/models';
import { CommonModule } from '@angular/common';
import { SharedStates } from '../../services/sharedStates.service';
@Component({
  selector: 'app-dropdown',
  imports: [CommonModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss'
})
export class DropdownComponent {
@Input() title!:string
@Input() data!:Priority[] | Status[] | Department[] |ReceivedEmployee[] |undefined;
@Input() chosenValue!:Priority| Status |Department |ReceivedEmployee |undefined;
@Input() classifier!:string
@Input() formSubmitted=signal(false)
@Input() isOpen: boolean = false;
@Output() getchosenValue=new EventEmitter();
@Output() toggle = new EventEmitter<string>();
chosenItem=signal({})
SharedStates=inject(SharedStates)



onToggle() {
  this.toggle.emit(this.classifier);
}


setValue(value:{id:number, name:string, icon?:string, surname?:string, avatar?:string, department?:Department}){
this.onToggle()
  this.chosenItem.set(value)
  if(this.classifier==='priority'){
    this.getchosenValue.emit({name:'priority',obj:value })
  }
  if(this.classifier==='statuses'){
    this.getchosenValue.emit({name:'status',obj:value })
  }
  if(this.classifier==='department'){
    this.getchosenValue.emit({name:'department',obj:value })
  }
  if(this.classifier==='employee'){
  
    this.getchosenValue.emit({name:'employee',obj:value })
  }
}
}

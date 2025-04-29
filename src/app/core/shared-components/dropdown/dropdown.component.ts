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
@Output() getchosenValue=new EventEmitter();
openList=signal(false);
chosenItem=signal({})
SharedStates=inject(SharedStates)


toggleOpen(){
  this.openList.set(!this.openList())

}

setValue(value:{id:number, name:string, icon?:string, surname?:string, avatar?:string, department?:Department}){
this.openList.set(false)
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

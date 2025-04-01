import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { Department, Priority, Status } from '../../types/models';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-dropdown',
  imports: [CommonModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss'
})
export class DropdownComponent {
  @Input() title!:string
@Input() data!:Priority[] | Status[];
@Input() chosenValue!:Priority| Status |Department;
@Input() classifier!:string
@Output() getchosenValue=new EventEmitter();
openList=signal(false);
chosenItem=signal({})

toggleOpen(){
  this.openList.set(!this.openList())
}

setValue(value:any){
this.openList.set(false)
  this.chosenItem.set(value)
  console.log(this.chosenItem())
  if(this.classifier==='priority'){
    this.getchosenValue.emit({name:'priority',obj:value })
  }
  if(this.classifier==='statuses'){
    this.getchosenValue.emit({name:'status',obj:value })
  }
  if(this.classifier==='department'){
    this.getchosenValue.emit({name:'department',obj:value })
  }
}
}

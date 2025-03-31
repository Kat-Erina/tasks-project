import { Component, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';
import { Priority, Status } from '../../types/models';
@Component({
  selector: 'app-dropdown',
  imports: [],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss'
})
export class DropdownComponent {
@Input() data!:Priority[] | Status[];
@Input() initialValue!:Priority| Status;
@Input() classifier!:string
@Output() getchosenValue=new EventEmitter();
openList=signal(false);
chosenItem=signal({})

toggleOpen(){
  this.openList.set(!this.openList())
}

setValue(value:any){
  console.log(this.data)
  console.log(this.classifier)
  this.chosenItem.set(value)
  console.log(value)
  if(this.classifier==='priorities'){
    this.getchosenValue.emit({name:'priority',obj:value })
  }
  if(this.classifier==='statuses'){
    this.getchosenValue.emit({name:'status',obj:value })
  }
}
}

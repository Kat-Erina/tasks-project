import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { SharedStates } from '../../services/sharedStates.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: '[appLi]',
  imports: [CommonModule],
  templateUrl: './li.component.html',
  styleUrl: './li.component.scss'
})
export class LiComponent {
@Input() title!:string
@Input() val!:string
@Output() valEmitter=new EventEmitter()
sharedStatesService=inject(SharedStates)

toggle(){
  if(this.sharedStatesService.receivedVal()===this.val){
   this.sharedStatesService.openFilteringCriterias.set(!this.sharedStatesService.openFilteringCriterias())
  }
  else{
    this.sharedStatesService.receivedVal.set(this.val)
    this.sharedStatesService.openFilteringCriterias.set(true)
}
console.log(this.sharedStatesService.receivedVal())
// this.valEmitter.emit
}

up(): boolean {
  return (
    this.sharedStatesService.receivedVal() === this.val &&
    this.sharedStatesService.openFilteringCriterias()
  );
}
}

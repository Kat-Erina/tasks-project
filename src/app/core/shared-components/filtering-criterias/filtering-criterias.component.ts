import { Component, EventEmitter, inject, Input, OnInit, Output, signal } from '@angular/core';
import { Department, Employee, Priority, ReceivedEmployee } from '../../types/models';
import { SharedStates } from '../../services/sharedStates.service';

@Component({
  selector: 'app-filtering-criterias',
  imports: [],
  templateUrl: './filtering-criterias.component.html',
  styleUrl: './filtering-criterias.component.scss'
})
export class FilteringCriteriasComponent {
  sharedStates=inject(SharedStates)
@Input() data: Department[]| ReceivedEmployee[]| Priority[]|undefined=[]
@Output() valueEmitter=new EventEmitter()
@Input() receivedVal=''
chosenCriterias=signal<(Department|ReceivedEmployee|Priority)[]>([])


handleChange(value:Department|ReceivedEmployee|Priority){
  console.log(value)
  if(this.receivedVal==='employees' && this.chosenCriterias().length>0){
    alert('აირჩიეთ მხოლოდ 1 თანამშრომელი')
    this.sharedStates.openFilteringCriterias.set(false)
    return
  } else{
    if(this.chosenCriterias().some(item=>item.id===value.id)){
      let data=this.chosenCriterias().filter(item =>{return item.id !== value.id})
      this.chosenCriterias.set(data)
      
    } else {
      this.chosenCriterias.set([...this.chosenCriterias(),value])
    }
  }
 
console.log(this.chosenCriterias())
}

handleChoose(event:Event){
  event.preventDefault()
  let key=this.receivedVal;
  let newobject={...this.sharedStates.chosenFilteringCriterias(), [key]:this.chosenCriterias()}
this.sharedStates.chosenFilteringCriterias.set(newobject);
this.sharedStates.openFilteringCriterias.set(false)
localStorage.setItem('criterias', JSON.stringify(this.sharedStates.chosenFilteringCriterias()))
// localStorage.clear()
}
}

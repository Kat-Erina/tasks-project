import { Component, EventEmitter, inject, Input, OnInit, Output, signal } from '@angular/core';
import { Department, Employee, Priority, ReceivedEmployee } from '../../types/models';
import { SharedStates } from '../../services/sharedStates.service';
import { ApiService } from '../../services/api.service';

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
chosenFilteringCriterias=this.sharedStates.chosenFilteringCriterias
apiService=inject(ApiService)
filterTasks=this.apiService.filterTasks
toBeStartedTasks=this.apiService.toBeStartedTasks
inProgressTasks=this.apiService.inProgressTasks
toBeTestedTasks=this.apiService.toBeTestedTasks
finishedTasks=this.apiService.finishedTasks


handleChange(value:Department|ReceivedEmployee|Priority){
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
 
}

handleChoose(event:Event){
  event.preventDefault()
  let key=this.receivedVal;
  let newobject={...this.sharedStates.chosenFilteringCriterias(), [key]:this.chosenCriterias()}
this.sharedStates.chosenFilteringCriterias.set(newobject);
this.sharedStates.openFilteringCriterias.set(false)
localStorage.setItem('criterias', JSON.stringify(this.sharedStates.chosenFilteringCriterias()))
this.toBeStartedTasks.set(this.filterTasks(this.toBeStartedTasks(), this.chosenFilteringCriterias()))
this.inProgressTasks.set(this.filterTasks(this.inProgressTasks(), this.chosenFilteringCriterias()))
this.toBeTestedTasks.set(this.filterTasks(this.toBeTestedTasks(), this.chosenFilteringCriterias()))
this.finishedTasks.set(this.filterTasks(this.finishedTasks(), this.chosenFilteringCriterias()))
}
}

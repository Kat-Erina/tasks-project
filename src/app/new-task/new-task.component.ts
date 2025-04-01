import { Component, effect, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { InputComponent } from '../core/shared-components/input/input.component';
import { CommonModule } from '@angular/common';
import { ApiService } from '../core/services/api.service';
import { Department, Priority, Status } from '../core/types/models';
import { DropdownComponent } from '../core/shared-components/dropdown/dropdown.component';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-new-task',
  imports: [InputComponent, CommonModule, DropdownComponent],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.scss'
})
export class NewTaskComponent implements OnInit{
 data={
    name:"", 
    description:"", 
    department:"", 
    employee:"", 
    deadline:""
  }

titleValue=signal('');
minimumLengthValid=signal(false);
maximumLengthValid=signal(true);
regexforMinimumLength =new RegExp(`^(?:.*?\\S.*?){2,}$`);
regexForMaximumLength=new RegExp(`^(?:\\S\\s*){256,}$`);
description=signal('');
descMinimumValidation=signal(false)
descMaximumValidation=signal(false)
formSubmitted=signal(false)

apiService=inject(ApiService)
priorities=signal<Priority[]>([])
statuses=signal<Status[]>([])
chosenPriority=signal<Priority>({id:0, name:"", icon: ''})
chosenstatus=signal<Status>({id:0, name:''})
departments=signal<Department[]>([])
chosenDepartment=signal<Department>({id:0, name:''})




handleNameChange(value:string){
    this.titleValue.set(value)
   this.minimumLengthValid.set(this.regexforMinimumLength.test(this.titleValue()));
   this.maximumLengthValid.set(this.regexForMaximumLength.test(this.titleValue()));
   this.data = { ...this.data, name: this.titleValue() };
   localStorage.setItem('taskData',JSON.stringify(this.data));
  }

  handleDescriptionChange(event:Event){
    const value=(event.target as HTMLTextAreaElement).value;
    this.description.set(value)
    this.descMinimumValidation.set(this.regexforMinimumLength.test(this.description()));
    this.descMaximumValidation.set(this.regexForMaximumLength.test(this.description()));
    this.data = { ...this.data, description: this.description() };
    localStorage.setItem('taskData',JSON.stringify(this.data));
  }
 
    

      handleDropDownChange(val:any){
let {name, obj}=val;
this.data = { ...this.data, [name]: obj };
if(name==="status"){
  this.chosenstatus.set(obj)
}
if(name==="priority"){
  this.chosenPriority.set(obj)
}
if(name==="department"){
  this.chosenDepartment.set(obj)
}
localStorage.setItem('taskData',JSON.stringify(this.data))
      }

      getAllDepartments(){
        this.apiService.getDepartments('departments').subscribe({
          next:(response)=>{console.log(response)
            this.departments.set(response)
          },
          error:(error)=>{console.log(error)}
        })
      }

      getEmployees(){
        this.apiService.getEmployees('employees').subscribe({
          next:(response)=>{console.log(response)
            // this.departments.set(response)
          },
          error:(error)=>{console.log(error)}
        })
      }
         

  ngOnInit(): void {
    // localStorage.clear()
    let fetchedData=localStorage.getItem('taskData');
    if(!fetchedData){
      localStorage.setItem('taskData', JSON.stringify(this.data));
    }
    else {
      let data=JSON.parse(fetchedData);
      this.data=data;
      this.titleValue.set(data.name);
      this.minimumLengthValid.set(this.regexforMinimumLength.test(this.titleValue()));
      this.maximumLengthValid.set(this.regexForMaximumLength.test(this.titleValue()));
      this.description.set(data.description)
      this.descMinimumValidation.set(this.regexforMinimumLength.test(this.description()));
      this.chosenDepartment.set(data.department)
         }

    this.apiService.getStatuses('statuses').subscribe({
      next:(response)=>{
        this.statuses.set(response);
        if(fetchedData){
          let data=JSON.parse(fetchedData);
            data.status? this.chosenstatus.set(data.status): this.chosenstatus.set(response[0])
        } 
      },
      error:(error)=>{console.log(error, "oops, error")}
    })

    this.apiService.getPriorities('priorities').subscribe({
      next:(response)=>{
        this.priorities.set(response);
        if(fetchedData){
          let data=JSON.parse(fetchedData);
            data.priority? this.chosenPriority.set(data.priority): this.chosenPriority.set(response[0])
        } 
      },
        error:(error)=>{console.log(error, "oops, error")}
      })
      this.getAllDepartments()
      this.getEmployees()
  }

  

  handleSubmit(event:Event){
    event.preventDefault();
this.formSubmitted.set(true);

if(this.formSubmitted() && (this.description().length>0 && !this.descMaximumValidation() && this.descMinimumValidation()) && this.minimumLengthValid() && !this.maximumLengthValid()  ){
console.log('sworia')
}

else {console.log('arasworia')}
console.log(this.descMaximumValidation(), this.descMinimumValidation(),this.minimumLengthValid() , this.maximumLengthValid())
  }
}

import { Component,  DestroyRef,  inject, OnInit, signal } from '@angular/core';
import { InputComponent } from '../core/shared-components/input/input.component';
import { CommonModule } from '@angular/common';
import { ApiService } from '../core/services/api.service';
import {  Priority, ReceivedEmployee, Status } from '../core/types/models';
import { DropdownComponent } from '../core/shared-components/dropdown/dropdown.component';
import { SharedStates } from '../core/services/sharedStates.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { format } from 'date-fns';
@Component({
  selector: 'app-new-task',
  imports: [InputComponent, CommonModule, DropdownComponent, FormsModule, 
    MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule,
    
  ],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.scss',
})
export class NewTaskComponent implements OnInit{
  router=inject(Router)
 data={
    name:"", 
    description:"", 
    department:undefined, 
    employee:undefined, 
    deadline:"", 
    due_date:''
  }
date!:Date
tomorrow=new Date(new Date().setDate(new Date().getDate() + 1));
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
sharedStates=inject(SharedStates)
priorities=signal<Priority[]>([])
statuses=signal<Status[]>([])
chosenPriority=signal<Priority | undefined>(undefined)
chosenstatus=signal<Status | undefined>(undefined)
chosenDepartment=this.sharedStates.chosenDepartment
chosenEmployee=signal<ReceivedEmployee|undefined>(undefined)
employees=this.sharedStates.employees
filteredEmployees=this.sharedStates.filteredEmployees
destroyRef=inject(DestroyRef)


openDropdownId: string | null = null;


  toggleDropdown(clickedId: string) {
   
    if (this.openDropdownId === clickedId) {
      this.openDropdownId = null;
    } else {
      this.openDropdownId = clickedId;
    }

  }

  isOpen(id: string): boolean {
    return this.openDropdownId === id;
  }




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
  this.chosenDepartment.set(obj);
  this.data = { ...this.data, employee: undefined };
  this.chosenEmployee.set(undefined)
localStorage.setItem('taskData',JSON.stringify(this.data)); 
let filteredEmployees=this.employees().filter((employee)=>{return employee.department?.id===obj.id });
this.filteredEmployees.set(filteredEmployees);
}
if(name==='employee'){
  this.chosenEmployee.set(obj)
  let filteredEmployees=this.employees().filter((employee)=>{return employee.department?.id===obj.department.id && employee.id!==obj.id });
  this.filteredEmployees.set(filteredEmployees);
}
localStorage.setItem('taskData',JSON.stringify(this.data))
}    

  ngOnInit(): void {
    let fetchedData=localStorage.getItem('taskData');
    this.apiService.getAllDepartments()
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
      this.chosenEmployee.set(data.employee)
      this.date=new Date(data.due_date)
         }

  let sub=this.apiService.getEmployees().subscribe({
        next:response=>{
this.employees.set(response)
if(fetchedData){
if(this.data.employee){
  this.chosenEmployee.set(this.data.employee)
  let updatedEmployees=this.employees().filter((employee)=>{return employee.department?.id===this.chosenDepartment()?.id && employee.id!==this.chosenEmployee()?.id})
  this.filteredEmployees.set(updatedEmployees)
}
else {
let empls=this.employees().filter((employee)=>{
return  employee.department?.id===this.chosenDepartment()?.id
})
this.filteredEmployees.set(empls)
}
}}, 
 error:error=>{console.log(error)},
         }     )

         this.destroyRef.onDestroy(()=>{
          sub.unsubscribe()
        })


 let statusSub=this.apiService.getStatuses().subscribe({
      next:(response)=>{
        this.statuses.set(response);
        if(fetchedData){
          let data=JSON.parse(fetchedData);
            data.status? this.chosenstatus.set(data.status): this.chosenstatus.set(response[0])
        } 
        else{this.chosenstatus.set(response[0])}
      },
      error:(error)=>{console.log(error, "oops, error")}
    })

    this.destroyRef.onDestroy(()=>{
      statusSub.unsubscribe()
    })

  let prioritiesSub=  this.apiService.getPriorities().subscribe({
      next:(response)=>{
        this.priorities.set(response);
        if(fetchedData){
          let data=JSON.parse(fetchedData);
            data.priority? this.chosenPriority.set(data.priority): this.chosenPriority.set(response[1])
        } 
        else{this.chosenPriority.set(response[1])}
      },
        error:(error)=>{console.log(error, "oops, error")}
      })

      this.destroyRef.onDestroy(()=>{
        prioritiesSub.unsubscribe()
      })
      }

    
      

      get isDescriptionValid(): boolean {
        const desc = this.description().trim();
        const charCount = desc.replace(/\s+/g, '').length;
        const wordCount = desc.split(/\s+/).filter(word => word.length > 0).length;
        return charCount > 0 && wordCount >= 4 
      }

      handleDatePick(){
      const pickedDate = new Date(this.date)
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      pickedDate.setHours(0, 0, 0, 0);
      tomorrow.setHours(0, 0, 0, 0);
        if (pickedDate.getTime() < tomorrow.getTime()) {
          alert('გთხოვთ აირჩიეთ მომავალი თარიღი')
        } else {
          const formattedDate = format(this.date, 'yyyy-MM-dd');
    this.data = { ...this.data, due_date: formattedDate };
localStorage.setItem('taskData',JSON.stringify(this.data)); 
        }
      }

    get validateTime(){
     if(!this.date){
      return undefined
     }
     else{
      const pickedDate = new Date(this.date);
      const tomorrow = new Date();
      pickedDate.setHours(0, 0, 0, 0);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      return pickedDate.getTime() >= tomorrow.getTime();
     }
      
    }  

  handleSubmit(event:Event){
    event.preventDefault();
this.formSubmitted.set(true);
if((this.description().length===0 || this.isDescriptionValid )&& this.minimumLengthValid() && !this.maximumLengthValid()
&& this.chosenDepartment() && this.chosenEmployee() && this.chosenstatus()&& this.chosenPriority()  ){
let data={
  name:this.titleValue(), 
  description:this.description(), 
  due_date:format(this.date, 'yyyy-MM-dd'),
  status_id:this.chosenstatus()?.id, 
  priority_id: this.chosenPriority()?.id,
  department_id: this.chosenDepartment()?.id, 
  employee_id:this.chosenEmployee()?.id, 
}

let sub=this.apiService.postData('tasks', data).subscribe(
  { next:()=>{
this.apiService.getTasks()
  this.titleValue.set('')
this.description.set(''), 
  this.chosenDepartment.set(undefined), 
  this.chosenEmployee.set(undefined)
  this.formSubmitted.set(false)
  localStorage.removeItem('taskData')
  this.router.navigate(['/'])

  
  },
error:error=>console.log(error)
}
 )

 this.destroyRef.onDestroy(()=>{
  sub.unsubscribe()
})
}
  }
}

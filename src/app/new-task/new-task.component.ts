import { Component, effect, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { InputComponent } from '../core/shared-components/input/input.component';
import { CommonModule } from '@angular/common';
import { ApiService } from '../core/services/api.service';
import { Priority, Status } from '../core/types/models';
import { DropdownComponent } from '../core/shared-components/dropdown/dropdown.component';

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
    // status:{id:0, name:''}, 
    department:"", 
    // priority:{id:0,name:'', icon:'' }, 
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
initialPriority=signal<Priority>({id:-1, name:"", icon: ''})
initialStatus=signal<Status>({id:-1, name:''})

// constructor(){
//   effect(() => {
//     console.log('effect is run')
//     if (this.priorities().length > 0 && this.status().length > 0) {
//       this.data = { 
//         ...this.data, 
//         priority: this.priorities()[0], 
//         status: this.status()[0] 
//       };
//       localStorage.setItem('taskData', JSON.stringify(this.data));
//     }
//   });
  
// }


handleNameChange(value:string){
    this.titleValue.set(value)
    // localStorage.setItem('taskData',JSON.stringify( {...this.data, name:this.titleValue()}));
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
 
  getPriorities(){
this.apiService.getPriorities('priorities').subscribe({
  next:(response)=>{console.log(response),this.priorities.set(response)
    let data={...this.data, priority:response[0]}
    console.log(data)
    this.data=data;
    this.initialPriority.set(response[1])
    localStorage.setItem('taskData',JSON.stringify(this.data))
  },
  error:(error)=>{console.log(error, "oops, error")}
})
  }


  getStatus(){
    this.apiService.getStatuses('statuses').subscribe({
      next:(response)=>{console.log(response),this.statuses.set(response)
        let data={...this.data, status:response[1]}
        this.data=data
        console.log(data)
        this.initialStatus.set(response[0])
        localStorage.setItem('taskData',JSON.stringify(this.data))
      },
      error:(error)=>{console.log(error, "oops, error")}
    })
      }

    

      handleDropDownChange(val:any){
let {name, obj}=val;
this.data = { ...this.data, [name]: obj };
localStorage.setItem('taskData',JSON.stringify(this.data))
      }
         

  ngOnInit(): void {
    localStorage.setItem('taskData', JSON.stringify(this.data));
    // localStorage.clear()
    let fetchedData=localStorage.getItem('taskData');
    if(!fetchedData){
      localStorage.setItem('taskData', JSON.stringify(this.data));
      this.getPriorities()
    this.getStatus()
    }
    else{
      let data=JSON.parse(fetchedData);
      console.log(data)
      this.data=data;
      this.titleValue.set(data.name);
      this.minimumLengthValid.set(this.regexforMinimumLength.test(this.titleValue()));
      this.maximumLengthValid.set(this.regexForMaximumLength.test(this.titleValue()));
      this.description.set(data.description)
      this.descMinimumValidation.set(this.regexforMinimumLength.test(this.description()));
      this.initialPriority.set(data.priority)
      this.initialStatus.set(data.status);
      localStorage.setItem('taskData', JSON.stringify(this.data));


    }

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

import { Component, inject, OnInit, Signal, signal } from '@angular/core';
import { SharedStates } from '../core/services/sharedStates.service';
import { InputComponent } from "../core/shared-components/input/input.component";
import { DropdownComponent } from "../core/shared-components/dropdown/dropdown.component";
import { Department } from '../core/types/models';
import { ApiService } from '../core/services/api.service';
import { SIGNAL } from '@angular/core/primitives/signals';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-employee',
  imports: [InputComponent, DropdownComponent,CommonModule],
  templateUrl: './new-employee.component.html',
  styleUrl: './new-employee.component.scss'
})
export class NewEmployeeComponent implements OnInit {
sharedState=inject(SharedStates);
apiService=inject(ApiService)
//reuirements

nameValue=signal('');
surnameValue=signal('')
chosenDepartment=signal<Department | undefined>(undefined)
minimumLengthValid=signal(false);
maximumLengthValid=signal(true);
minimumSurnameLengthValid=signal(false);
maximumSurnameLengthValid=signal(true);
regexforMinimumLength =new RegExp(`^(?:.*?\\S.*?){2,}$`);
regexForMaximumLength=new RegExp(`^(?:\\S\\s*){256,}$`);
formSubmitted=signal(false);
openList=signal(false)
selectedDepartment?:Department
photo=signal<any>(undefined)
imageSrc=signal('')
data={
  name:'', 
  surname:'', 
  avatar:'', 
}


handleNameChange(value:string){
  this.nameValue.set(value)
 this.minimumLengthValid.set(this.regexforMinimumLength.test(this.nameValue()));
 this.maximumLengthValid.set(this.regexForMaximumLength.test(this.nameValue()));
 this.data = { ...this.data, name: this.nameValue() };
 localStorage.setItem('employeeData',JSON.stringify(this.data));
}
handleSurnameChange(value:string){
  this.surnameValue.set(value)
 this.minimumSurnameLengthValid.set(this.regexforMinimumLength.test(this.surnameValue()));
 this.maximumSurnameLengthValid.set(this.regexForMaximumLength.test(this.surnameValue()));
 this.data = { ...this.data, surname: this.surnameValue() };
 localStorage.setItem('employeeData',JSON.stringify(this.data));
}

toggleOpen(){
  this.openList.set(!this.openList())
}

//img functionality 

onFileChange(event: Event) {


  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0 && input.files[0]) {
    const file = input.files[0];
   
    const maxSize = 600 * 1024;
    if (file.size > maxSize) {
      alert('File size exceeds the 600KB limit.');
      return;
    }
  
    const formData = new FormData();
    formData.append('file', file, file.name);
    this.photo.set(input.files[0]);
    const reader=new FileReader()
    reader.onload = () => {
      const imageString=reader.result as string;
      this.imageSrc.set(imageString)
      }
      reader.readAsDataURL(input.files[0]);

  } 
   
}

 triggerFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput?.click();
  }

  removeImg(event:Event){
event.stopPropagation()
    this.imageSrc.set("")
    }

handleDepartmentChange(value:{name:string, obj:{name:string, id:number}}){
  let {name, obj}=value;
    this.chosenDepartment.set(obj);
  this.data = { ...this.data, [name]: obj };
  console.log(this.data)
  localStorage.setItem('employeeData', JSON.stringify(this.data));
}


ngOnInit(): void {
  // localStorage.clear()
  let fetchedData=localStorage.getItem('employeeData');
  if(!fetchedData){
    localStorage.setItem('employeeData', JSON.stringify(this.data));
  }
  else {
    let data=JSON.parse(fetchedData);
    this.data=data;
    this.nameValue.set(data.name);
    this.minimumLengthValid.set(this.regexforMinimumLength.test(this.nameValue()));
    this.maximumLengthValid.set(this.regexForMaximumLength.test(this.nameValue()));
    this.surnameValue.set(data.surname);
    this.minimumSurnameLengthValid.set(this.regexforMinimumLength.test(this.surnameValue()));
    this.maximumSurnameLengthValid.set(this.regexForMaximumLength.test(this.surnameValue()));
    this.chosenDepartment.set(data.department)
       }

       this.apiService.getAllDepartments()
}

closeModal(event:Event){
  event.stopPropagation()
  
  this.sharedState.openEmployeeModal.set(false)
}

handleSubmit(event:Event){
  this.formSubmitted.set(true)
  event.preventDefault();

  
  if(this.nameValue() && this.imageSrc()&&this.surnameValue() &&this.chosenDepartment()){
    console.log('vasubmiteb')
    const formData = new FormData();
    formData.append('avatar', this.photo(), this.photo().name);
    formData.append('name', this.nameValue());
    formData.append('surname', this.surnameValue());
    formData.append('department_id', this.chosenDepartment()?.id.toString()||'');


    this.apiService.postData('employees', formData).subscribe({
      next:response=>{
        if(response){
          console.log(response)
          this.sharedState.openEmployeeModal.set(false);
          localStorage.removeItem('employeeData')
        }
      },
      error:error=>console.log(error)
    })
  }
  

  else {

}
}}

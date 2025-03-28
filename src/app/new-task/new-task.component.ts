import { Component, OnInit, signal } from '@angular/core';
import { InputComponent } from '../core/shared-components/input/input.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-task',
  imports: [InputComponent, CommonModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.scss'
})
export class NewTaskComponent implements OnInit{
 data={
    name:"", 
    description:"", 
    status:"", 
    department:"", 
    priority:"", 
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


handleNameChange(value:string){
    this.titleValue.set(value)
    localStorage.setItem('taskData',JSON.stringify( {...this.data, name:this.titleValue()}));
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
    console.log(  this.descMinimumValidation())
  }
 
  ngOnInit(): void {
    // localStorage.clear()
    let fetchedData=localStorage.getItem('taskData');
    if(fetchedData){
      let data=JSON.parse(fetchedData);
      console.log(data)
      this.data=data;
      this.titleValue.set(data.name);
      this.minimumLengthValid.set(this.regexforMinimumLength.test(this.titleValue()));
      this.maximumLengthValid.set(this.regexForMaximumLength.test(this.titleValue()));
      this.description.set(data.description)
      this.descMinimumValidation.set(this.regexforMinimumLength.test(this.description()));
      this.descMaximumValidation.set(this.regexForMaximumLength.test(this.description()));
      
    }
    else{
      localStorage.setItem('taskData', JSON.stringify(this.data))
    }
    console.log(this.description())
    // console.log(  this.descMinimumValidation())

  }


  handleSubmit(event:Event){
    event.preventDefault();
this.formSubmitted.set(true);

if(this.formSubmitted()){}

  }
}

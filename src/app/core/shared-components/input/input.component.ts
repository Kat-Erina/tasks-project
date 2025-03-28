import { CommonModule } from '@angular/common';
import { Component, effect, EventEmitter, Input, input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  imports: [CommonModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {
value=input<string>('')
@Input() label=""
@Input() minimumLengthIsValid!:boolean
@Input() maxiumLengthIsValid!:boolean
@Input() minimumRequirement=""
@Input() maximumRequirement=""
@Output() valueEmit=new EventEmitter<string>();


handleChange(event:Event){
this.valueEmit.emit((event.target as HTMLInputElement).value);
}


  
}



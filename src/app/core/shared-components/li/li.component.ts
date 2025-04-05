import { Component, inject, Input } from '@angular/core';
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
sharedStatesService=inject(SharedStates)


}

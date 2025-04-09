import { Component, Input } from '@angular/core';
import { Department, Employee, Priority, ReceivedEmployee } from '../../types/models';

@Component({
  selector: 'app-filtering-criterias',
  imports: [],
  templateUrl: './filtering-criterias.component.html',
  styleUrl: './filtering-criterias.component.scss'
})
export class FilteringCriteriasComponent {
@Input() data: Department[]| ReceivedEmployee[]| Priority[]|undefined=[]

handleChange(item:any){
  console.log(item)
}
}

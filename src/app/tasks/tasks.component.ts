import { Component, inject, signal } from '@angular/core';
import { LiComponent } from '../core/shared-components/li/li.component';
import { SharedStates } from '../core/services/sharedStates.service';

@Component({
  selector: 'app-tasks',
  imports: [LiComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent {
sharedStatesService=inject(SharedStates)
sth=signal<undefined|Event>(undefined)


}

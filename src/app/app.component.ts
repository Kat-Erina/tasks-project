import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { NewEmployeeComponent } from "./new-employee/new-employee.component";
import { SharedStates } from './core/services/sharedStates.service';

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [RouterOutlet, HeaderComponent, NewEmployeeComponent, NewEmployeeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  sharedStates=inject(SharedStates)
  title = 'tasks-project';
}

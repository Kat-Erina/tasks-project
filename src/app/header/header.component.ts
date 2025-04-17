import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SharedStates } from '../core/services/sharedStates.service';


@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
sharredState=inject(SharedStates)
}

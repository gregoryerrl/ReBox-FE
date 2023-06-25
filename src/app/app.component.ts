import { Component } from '@angular/core';

import { LoginComponentComponent } from './components/login-component/login-component.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ReBox-FE';
}

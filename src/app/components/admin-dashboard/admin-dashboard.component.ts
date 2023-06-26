import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

interface Box {
  _id: String;
  label: String;
  content: String;
  manufacturer: String;
  details: String;
  qrb64: String;
  empty: Boolean;
}

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent {
  navtab = 1;
  pack = 0;
  deliver = 0;
  allboxes = 0;
  boxes: Box[] = [];
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.http
      .get<{ count: number }>(`${environment.backend_url}/boxes/count`)
      .subscribe((response) => {
        // Filter the user list to include only active users
        this.allboxes = response.count;
      });
    this.http
      .get<{ count: number }>(`${environment.backend_url}/boxes/empty/count`)
      .subscribe((response) => {
        // Filter the user list to include only active users
        this.pack = response.count;
      });
    this.http
      .get<{ count: number }>(`${environment.backend_url}/boxes/nonempty/count`)
      .subscribe((response) => {
        // Filter the user list to include only active users
        this.deliver = response.count;
      });
  }

  public Logout(): void {
    this.router.navigate(['']);
  }

  getAllBoxes() {
    this.boxes = [];
    this.http
      .get<{ boxes: Box[] }>(`${environment.backend_url}/boxes`)
      .subscribe((response) => {
        // Filter the user list to include only active users
        this.boxes = response.boxes;
      });
  }

  changeNavTab(tab: number): void {
    this.navtab = tab;
  }

  deleteBox(id: String) {
    this.http
      .delete<{ message: String }>(`${environment.backend_url}/box/${id}`)
      .subscribe((response) => {
        this.getAllBoxes();
      });
  }
}

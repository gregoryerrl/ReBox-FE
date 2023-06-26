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
  empty: Boolean;
  qrb64: String;
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
  selectedBoxId = '';
  selectedBox: Box = {} as Box;

  box = {
    label: '',
    content: '',
    manufacturer: '',
    details: '',
    empty: true,
  };

  createBox = false;
  updateBox = false;

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

  cancelEditBox() {
    this.updateBox = false;
    this.selectedBoxId = '';
    this.selectedBox = {} as Box;
  }

  generateBox(bool: boolean) {
    this.createBox = bool;
  }

  createNewBox(): void {
    const url = `${environment.backend_url}/createbox`;
    const body = {
      label: this.box.label,
      content: this.box.content,
      manufacturer: this.box.manufacturer,
      details: this.box.details,
      empty: this.box.empty,
    };
    console.log(url);

    this.http.post<any>(url, body).subscribe((response) => {
      console.log('sucess');
      console.log(response); // log response for debugging purposes
      if (response.success) {
        alert('Box created successfully!');
      } else {
        alert(response.message); // show error message returned by API
      }
    });
  }

  selectEdit(box: any) {
    this.updateBox = true;
    this.selectedBoxId = box._id;
    this.selectedBox = box;
  }

  updateBoxDetails() {
    const url = `${environment.backend_url}/box/${this.selectedBoxId}`;

    const label = '';
    const content = '';
    const manufacturer = '';
    const details = '';
    const empty = undefined;

    const payload: any = {
      label: this.box.label,
      content: this.box.content,
      manufacturer: this.box.manufacturer,
      details: this.box.details,
      empty: this.box.empty,
    };

    // Send the PUT request with the non-empty payload
    this.http.put<any>(url, payload).subscribe((response) => {
      if (response.success) {
        alert('Box created successfully!');
      } else {
        alert(response.message); // show error message returned by API
      }
    });
  }
}

import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  selector: 'box-detail-component',
  templateUrl: './box-detail-component.html',
  styleUrls: ['./box-detail-component.scss'],
})
export class BoxDetailComponent {
  id = '';
  key = '54321';
  keyinput = '';
  access = false;
  box = {} as Box;
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getBoxDetails();
  }

  getBoxDetails() {
    const id = this.route.snapshot.params['id'];
    this.http
      .get<{ box: Box }>(`${environment.backend_url}/box/${id}`)
      .subscribe((response) => {
        // Filter the user list to include only active users
        this.box = response.box;
      });
  }

  accessKey() {
    if (this.key == this.keyinput) {
      this.access = true;
      console.log('Success');
    } else if (this.key != this.keyinput) {
      alert('Wrong Key');
    }
    console.log(this.key);

    console.log(this.keyinput);
  }
}

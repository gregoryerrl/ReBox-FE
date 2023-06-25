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
}

@Component({
  selector: 'box-detail-component',
  templateUrl: './box-detail-component.html',
  styleUrls: ['./box-detail-component.scss'],
})
export class BoxDetailComponent {
  id = '';
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
}

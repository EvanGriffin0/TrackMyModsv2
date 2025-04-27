import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  data: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    // Example Observable: Fetching dummy data from an API
    this.http.get('https://jsonplaceholder.typicode.com/posts')
      .subscribe(response => {
        this.data = response;
        console.log('Data from observable', this.data);
      }, error => {
        console.error('Error fetching data', error);
      });
  }
}

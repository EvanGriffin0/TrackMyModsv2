import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class HomePage implements OnInit {

  data: { title: string }[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    // Example Observable: Fetching dummy data from an API
    this.http.get('https://jsonplaceholder.typicode.com/posts')
      .subscribe(response => {
        this.data = response as { title: string }[];
        console.log('Data from observable', this.data);
      }, error => {
        console.error('Error fetching data', error);
      });
  }
}

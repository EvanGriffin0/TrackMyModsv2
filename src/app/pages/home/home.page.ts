import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../../services/auth.services'; // Ensure correct path to AuthService

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, ]  // Added HttpClientModule here
})
export class HomePage implements OnInit {

  data: { title: string }[] = [];
  constructor(private AuthService: AuthService) { }

  ngOnInit() {
    // Example Observable: Fetching dummy data from an API
   
  }
}

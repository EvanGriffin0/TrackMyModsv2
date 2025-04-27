import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-garage',
  templateUrl: './garage.page.html',
  styleUrls: ['./garage.page.scss'],
  standalone: true,
  imports: [CommonModule,IonicModule], 
})
export class GaragePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

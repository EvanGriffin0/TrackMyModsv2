import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ModificationService } from '../services/modification.service';
import { Modification } from '../models/modification.model'; // Adjust the import path as necessary

@Component({
  selector: 'app-modifications-list',
  templateUrl: './modifications-list.page.html',
  styleUrls: ['./modifications-list.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class ModificationsListPage implements OnInit {
  modifications!: Modification[];

  constructor(private modificationService: ModificationService) {}

  ngOnInit() {
    // Subscribe to the observable (async via Observable pattern)
    this.modificationService.getModifications().subscribe(data => {
      this.modifications = data;
    });
  }
}

import { NgClass, NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import {MatSlideToggleChange, MatSlideToggleModule} from '@angular/material/slide-toggle';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  imports: [NgClass, NgOptimizedImage, MatSlideToggleModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  theme = inject(ThemeService);

  menuOpen = false;

  toggleMenu(){
    this.menuOpen = !this.menuOpen;
  }

  toggleStaff($event: MatSlideToggleChange){
    this.theme.isStaffMode = $event.checked;
  }

}

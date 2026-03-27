import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  isStaffMode = false;
  isPretendMode = false;

  getColor(){
    if (this.isStaffMode){
      if(this.isPretendMode){
        return "theme-orange"
      }
      else{
        return "theme-yellow"
      }
    }
    return "";
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { ScrollTopDirective } from './directives/scroll-top.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavBarComponent, ScrollTopDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    //Recupere la valeur en localStorage du darkmode a chaque fois que l'app est charger
    const darkmode = localStorage.getItem("darkmode");
    if (darkmode) {
      if (darkmode === "1") {
        document.body.classList.add("dark-theme");
      } else {
        document.body.classList.remove("dark-theme");
      }
    }
  }


  //Change le darkmode et stocke sa valeur en localstorage
  toggleDarkTheme(): void {
    const body = document.body
    body.classList.toggle('dark-theme');
    if (body.classList.contains("dark-theme")) {
      localStorage.setItem("darkmode", "1")
    } else {
      localStorage.setItem("darkmode", "0")
    }
  }

}

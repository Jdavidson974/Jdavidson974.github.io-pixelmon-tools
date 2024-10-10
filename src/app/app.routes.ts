import { Routes } from '@angular/router';
import { BingoComponent } from './bingo/bingo.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    { path: "bingo", component: BingoComponent },
    { path: "", component: HomeComponent }
];

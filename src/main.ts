import { bootstrapApplication } from '@angular/platform-browser';
import { provideStore, StoreModule } from '@ngrx/store';
import { bingoReducer } from './app/reducers/bingo.reducer';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
const appConfig = {
  providers: [
    provideStore({ bingoData: bingoReducer }), // Configure le store ici
    provideRouter(routes),
    provideHttpClient()
    // Autres providers si nécessaire
  ],
};
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

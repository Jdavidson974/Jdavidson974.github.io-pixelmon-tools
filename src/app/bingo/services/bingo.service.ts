import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { BingoModel } from '../models/bingoData.model';
import { Store } from '@ngrx/store';
import { loadBingoData, removeBingoData } from '../../actions/bingo.action';

@Injectable({
  providedIn: 'root'
})
export class BingoService {
  private http = inject(HttpClient);

  constructor(private store: Store<{ bingoData: BingoModel }>) { }

  getBingoData(pokelist: string[]): Observable<BingoModel> {
    return this.http.post<BingoModel>("https://pokeapi-blue.vercel.app/pokemons/bingo", pokelist).pipe(
      tap(data => {
        if (data) {
          console.log(data);

          // Dispatch de l'action avec les données reçues
          this.store.dispatch(loadBingoData(data));
        }
      })
    );
  }

  clearBingoData() {
    this.store.dispatch(removeBingoData());
  }
}

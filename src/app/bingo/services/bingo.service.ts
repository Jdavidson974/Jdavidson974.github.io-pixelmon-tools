import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { BingoModel } from '../models/bingoData.model';

@Injectable({
  providedIn: 'root'
})
export class BingoService {

  constructor(private req: HttpClient,) { }
  $bingoData !: Observable<BingoModel>;
  getBingoData(pokelist: string[]) {
    return this.req.post("https://pokeapi-blue.vercel.app/pokemons/bingo", pokelist).pipe(
      tap(data => {
        if (data) {
          // this.$bingoData = store

        }
      })
    ).subscribe();
  }
}

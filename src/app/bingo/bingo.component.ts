import { Component, OnInit } from '@angular/core';
import { BingoService } from './services/bingo.service';
import { Observable, of, tap } from 'rxjs';
import { BingoModel } from './models/bingoData.model';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { CheckCaseDirective } from './directives/check-case.directive';

@Component({
  selector: 'app-bingo',
  standalone: true,
  imports: [AsyncPipe, CheckCaseDirective],
  providers: [BingoService],
  templateUrl: './bingo.component.html',
  styleUrl: './bingo.component.scss'
})
export class BingoComponent {
  bingoData$: Observable<BingoModel>;
  loading: boolean = false;
  constructor(private bingoService: BingoService, private store: Store<{ bingoData: BingoModel }>) {
    this.bingoData$ = this.store.select('bingoData');
  }

  getBingoData() {
    const pokelist: string[] = ["Sawk Solosis Bergmite Roselia Graveler Cubchoo Caterpie Komala Clodsire Yanma Pupitar Metang Zigzagoon Phantump Slakoth Cufant Gligar Ursaring Boldore Sealeo Cascoon Quilava Klefki Corphish Minun"];

    this.loading = true; // Démarre le chargement

    this.bingoService.getBingoData(pokelist).subscribe({
      next: () => {
        this.loading = false; // Arrête le chargement lorsque les données sont reçues
      },
      error: () => {
        this.loading = false; // Arrête le chargement en cas d'erreur
      }
    });
  }

  deleteBingoData() {
    this.bingoService.clearBingoData();
  }
}

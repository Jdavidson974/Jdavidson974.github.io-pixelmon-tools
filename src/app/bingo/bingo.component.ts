import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { BingoService } from './services/bingo.service';

@Component({
  selector: 'app-bingo',
  standalone: true,
  imports: [
// TODO: `HttpClientModule` should not be imported into a component directly.
// Please refactor the code to add `provideHttpClient()` call to the provider list in the
// application bootstrap logic and remove the `HttpClientModule` import from this component.
HttpClientModule,],
  providers: [BingoService],
  templateUrl: './bingo.component.html',
  styleUrl: './bingo.component.scss'
})
export class BingoComponent {
  constructor(private bingoServices: BingoService) { }
  bingoCase: Array<any> = new Array(25);
  getBingoData() {
    const pokelist: string[] = ["Sawk Solosis Bergmite Roselia Graveler Cubchoo Caterpie Komala Clodsire Yanma Pupitar Metang Zigzagoon Phantump Slakoth Cufant Gligar Ursaring Boldore Sealeo Cascoon Quilava Klefki Corphish Minun"
    ]
    const data = this.bingoServices.getBingoData(pokelist);
    console.log(data);

  }
}

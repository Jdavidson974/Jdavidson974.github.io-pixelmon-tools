import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { BingoService } from './services/bingo.service';

@Component({
  selector: 'app-bingo',
  standalone: true,
  imports: [HttpClientModule,],
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

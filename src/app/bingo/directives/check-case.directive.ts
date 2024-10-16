import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { PokemonModel } from '../models/bingoData.model';
import { BingoService } from '../services/bingo.service';

@Directive({
  selector: '[appCheckCase]',
  standalone: true
})
export class CheckCaseDirective {

  @Input() pokemon !: PokemonModel;
  constructor(private el: ElementRef, private renderer: Renderer2, private bingoService: BingoService) { }
  @HostListener('click', ['$event'])
  toggleCheckCase() {
    this.bingoService.CheckOrUncheckValue(this.pokemon.id)
  }
}

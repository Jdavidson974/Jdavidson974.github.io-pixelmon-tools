import { Component, OnInit } from '@angular/core';
import { BingoService } from './services/bingo.service';
import { Observable } from 'rxjs';
import { BingoModel } from './models/bingoData.model';
import { Store } from '@ngrx/store';
import { AsyncPipe, CommonModule } from '@angular/common';
import { CheckCaseDirective } from './directives/check-case.directive';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TimerComponent } from "../timer/timer.component";

@Component({
  selector: 'app-bingo',
  standalone: true,
  imports: [AsyncPipe, CheckCaseDirective, FormsModule, ReactiveFormsModule, CommonModule, TimerComponent],
  providers: [BingoService],
  templateUrl: './bingo.component.html',
  styleUrls: ['./bingo.component.scss']
})
export class BingoComponent implements OnInit {
  bingoData$: Observable<BingoModel>;
  loading: boolean = false;
  bingoForm!: FormGroup;

  constructor(
    private bingoService: BingoService,
    private store: Store<{ bingoData: BingoModel }>,
    private fb: FormBuilder
  ) {
    this.bingoData$ = this.store.select('bingoData');
  }

  ngOnInit(): void {
    this.bingoForm = this.fb.group({
      pokelist: this.fb.control('', [Validators.required, this.customValidator])
    });

    // Écoute les changements de valeur sur le contrôle 'pokelist'
    this.bingoForm.get('pokelist')?.valueChanges.subscribe(value => {
      const transformedValue = this.transformPokelist(value);
      if (transformedValue !== value) {
        this.bingoForm.get('pokelist')?.setValue(transformedValue, { emitEvent: false });
      }
    });
  }

  getBingoData() {
    if (this.bingoForm.valid) {
      const pokelist: string[] = [this.bingoForm.get("pokelist")?.value];

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
  }

  deleteBingoData() {
    this.bingoService.clearBingoData();
    localStorage.removeItem("bingoStartTime");
  }

  customValidator(control: AbstractControl): { [key: string]: any } | null {
    const correctionTab: { string1: string; string2: string }[] = [
      { string1: "Slither", string2: "Wing" },
      { string1: "Iron", string2: "Fist" },
      { string1: "Iron", string2: "Valiant" },
    ];

    const pokelist = control.value;
    const pokelistArray: string[] = pokelist.split(" ").map((el: string) => el.trim());

    // Vérification des corrections sans modifier le contrôle
    const correctedList = [];
    for (let i = 0; i < pokelistArray.length; i++) {
      const current = pokelistArray[i];
      const next = pokelistArray[i + 1] || ""; // Prochain élément s'il existe

      // Trouve une correspondance dans le tableau de correction
      const correction = correctionTab.find(c => c.string1 === current && c.string2 === next);

      if (correction) {
        correctedList.push(`${correction.string1}-${correction.string2}`);
        i++; // Incrémente pour ignorer le prochain élément
      } else {
        correctedList.push(current);
      }
    }

    // Vérification si la longueur est correcte
    if (correctedList.length === 25) {
      return null; // Validité
    }

    return { invalidValue: true }; // Erreur de validation si la longueur n'est pas correcte
  }

  transformPokelist(pokelist: string): string {
    //Ajouter ici les cas ou le jeu envoie 2 sting pour 1 pokemon
    const correctionTab: { string1: string; string2: string }[] = [
      { string1: "Slither", string2: "Wing" },
      { string1: "Iron", string2: "Hands" },
      { string1: "Iron", string2: "Valiant" }
    ];

    const pokelistArray: string[] = pokelist.split(" ").map((el: string) => el.trim());

    const correctedList = [];
    for (let i = 0; i < pokelistArray.length; i++) {
      const current = pokelistArray[i];
      const next = pokelistArray[i + 1] || ""; // Prochain élément s'il existe

      // Trouve une correspondance dans le tableau de correction
      const correction = correctionTab.find(c => c.string1 === current && c.string2 === next);

      if (correction) {
        correctedList.push(`${correction.string1}-${correction.string2}`);
        i++; // Incrémente pour ignorer le prochain élément
      } else {
        correctedList.push(current);
      }
    }

    return correctedList.join(" ");
  }

  checkValidity() {
    const control = this.bingoForm.get('pokelist');
    if (control?.errors?.['invalidValue'] && control?.valid) {
      control.setErrors(null);
    } else if (!control?.errors?.['invalidValue'] && control?.invalid) {
      control.setErrors({ invalidValue: true });
    }
  }
}

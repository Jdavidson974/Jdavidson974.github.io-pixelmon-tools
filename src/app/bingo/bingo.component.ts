import { Component, OnInit } from '@angular/core';
import { BingoService } from './services/bingo.service';
import { Observable } from 'rxjs';
import { BingoModel } from './models/bingoData.model';
import { Store } from '@ngrx/store';
import { AsyncPipe, CommonModule } from '@angular/common';
import { CheckCaseDirective } from './directives/check-case.directive';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { TimerComponent } from "../timer/timer.component";
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-bingo',
  standalone: true,
  imports: [AsyncPipe, CheckCaseDirective, FormsModule, ReactiveFormsModule, CommonModule, TimerComponent, ToastModule],
  providers: [BingoService, MessageService],
  templateUrl: './bingo.component.html',
  styleUrls: ['./bingo.component.scss']
})
export class BingoComponent implements OnInit {

  bingoData$: Observable<BingoModel>;
  loading: boolean = false;
  bingoForm!: FormGroup;
  correctionTab: { string1: string; string2: string }[] = [
    { string1: "Slither", string2: "Wing" },
    { string1: "Iron", string2: "Fist" },
    { string1: "Iron", string2: "Valiant" },
    { string1: "Iron", string2: "Thorn" },
    { string1: "Iron", string2: "Treads" },
    { string1: "Iron", string2: "Bundle" },
    { string1: "Iron", string2: "Hands" },
    { string1: "Iron", string2: "Jugulis" },
    { string1: "Iron", string2: "Moth" },
    { string1: "Iron", string2: "Leaves" },
    { string1: "Iron", string2: "Boulder" },
    { string1: "Iron", string2: "Crown" },
    { string1: "Raging", string2: "Bolt" },
    { string1: "Great", string2: "Tusk" },
    { string1: "Scream", string2: "Tail" },
    { string1: "Brute", string2: "Bonnet" },
    { string1: "Flutter", string2: "Mane" },
    { string1: "Sandy", string2: "Shocks" },
    { string1: "Roaring", string2: "Moon" },
    { string1: "Walking", string2: "Wake" },
    { string1: "Gouging", string2: "Fire" },
  ];
  constructor(
    private bingoService: BingoService,
    private store: Store<{ bingoData: BingoModel }>,
    private fb: FormBuilder,
    private msgService: MessageService,
  ) {
    this.bingoData$ = this.store.select('bingoData');
  }

  ngOnInit(): void {
    this.bingoForm = this.fb.group({
      pokelist: this.fb.control('', [Validators.required, this.createCustomValidator(this.correctionTab)])
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

  createCustomValidator(correctionTab: { string1: string; string2: string }[]) {
    return (control: AbstractControl): ValidationErrors | null => {
      const pokelist = control.value;
      const pokelistArray: string[] = pokelist.split(" ").map((el: string) => el.trim());

      const correctedList = [];
      for (let i = 0; i < pokelistArray.length; i++) {
        const current = pokelistArray[i];
        const next = pokelistArray[i + 1] || ""; // Prochain élément s'il existe

        const correction = correctionTab.find(c => c.string1 === current && c.string2 === next);

        if (correction) {
          correctedList.push(`${correction.string1}-${correction.string2}`);
          i++; // Incrémente pour ignorer le prochain élément
        } else {
          correctedList.push(current);
        }
      }

      if (correctedList.length === 25) {
        return null;
      }
      return { invalidValue: true };
    };
  }

  //Permets de transformer les valeurs du formulaire par les valeur des pokemon paradox trouver avec un "-"
  transformPokelist(pokelist: string): string {
    const pokelistArray: string[] = pokelist.split(" ").map((el: string) => el.trim());

    const correctedList = [];
    for (let i = 0; i < pokelistArray.length; i++) {
      const current = pokelistArray[i];
      const next = pokelistArray[i + 1] || ""; // Prochain élément s'il existe

      // Trouve une correspondance dans le tableau de correction
      const correction = this.correctionTab.find(c => c.string1 === current && c.string2 === next);

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

  copyToClipboard(cmd: string) {
    navigator.clipboard.writeText(cmd);
    this.msgService.add({ severity: 'success', summary: 'Success', detail: `command : ${cmd} was successfully copied to the clipboard` });
  }
}

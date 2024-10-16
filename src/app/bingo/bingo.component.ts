import { Component, OnInit } from '@angular/core';
import { BingoService } from './services/bingo.service';
import { delay, Observable, of, tap, timeout } from 'rxjs';
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
  styleUrl: './bingo.component.scss'
})
export class BingoComponent implements OnInit {
  bingoData$: Observable<BingoModel>;
  loading: boolean = false;
  bingoForm !: FormGroup;
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
    })
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
    // Exemple de validation : la valeur doit être 'correct'
    try {

      const pokelist = control.value;
      const pokelistArray: string[] = pokelist.split(" ").map((el: string) => el.trim())
      if (pokelistArray.length == 25) {
        return null
      } else {
        return { invalidValue: true }
      }
    } catch (e) {
      return { invalidValue: true }
    }

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

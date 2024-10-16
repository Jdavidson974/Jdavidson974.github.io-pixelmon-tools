import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss'
})
export class TimerComponent implements OnInit, OnDestroy {
  startTime!: number;
  timerSubscription!: Subscription;
  elapsedTime: string = '00:00:00';

  ngOnInit(): void {
    // Récupérer le timestamp de départ du localStorage
    const storedStartTime = localStorage.getItem('bingoStartTime');

    if (storedStartTime) {
      // Si un timestamp est trouvé, on l'utilise pour calculer le temps écoulé
      this.startTime = parseInt(storedStartTime, 10);
    } else {
      // Sinon, initialiser le timestamp actuel
      this.startTime = Date.now();
      localStorage.setItem('bingoStartTime', this.startTime.toString());
    }

    // Démarrer le minuteur
    this.startTimer();
  }

  ngOnDestroy(): void {
    console.log("destroy");

    // Nettoyer la souscription lorsque le composant est détruit
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  startTimer(): void {
    // Met à jour le minuteur toutes les secondes
    this.timerSubscription = interval(1000).subscribe(() => {
      const currentTime = Date.now();
      const elapsed = currentTime - this.startTime;
      this.elapsedTime = this.formatTime(elapsed);
    });
  }

  formatTime(ms: number): string {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const pad = (num: number) => (num < 10 ? '0' + num : num);
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  }
}

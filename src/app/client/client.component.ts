import { Component } from '@angular/core';
import { Card } from '../card/card.component';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent {
  currentCard!: Card;
  displayProgressSpinner: boolean = false;

  constructor() {
  }

  onShuffled() {
    this.displayProgressSpinner = true;
    setTimeout(() => {
      this.displayProgressSpinner = false;
    }, 3000);
  }

  onCardDealt(card: Card) {
    this.currentCard = card;
  }
}

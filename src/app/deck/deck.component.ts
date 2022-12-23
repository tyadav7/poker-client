import { Component, EventEmitter,Output } from '@angular/core';
import { Card } from '../card/card.component';
import { DeckService } from '../services/deck/deck.service';
import { OverlayService } from '../services/overlay/overlay.service';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.scss'],
})
export class DeckComponent {

  @Output() dealt:EventEmitter<Card>;
  @Output() shuffle:EventEmitter<void>;


  constructor(private deckService: DeckService, private overlayService:OverlayService) {
    this.dealt = new EventEmitter();
    this.shuffle = new EventEmitter();
  }

  onShuffleClicked(){

    this.deckService.shuffle().subscribe(() => {
      this.shuffle.emit();
    })
  }

  onDeckClicked() {
    this.deckService.deal().subscribe((card:Card) => {
      this.dealt.emit(card);
    });
  }
}

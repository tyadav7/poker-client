import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { AddRemoteClass, RemoteClassFactory } from '../config/remote-class';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() rank: RANK = RANK.A;
  @Input() suit: SUIT = SUIT.CLUBS;

  getColor() {
    return SUITCOLOR(this.suit);
  }
}

function SUITCOLOR(suit: SUIT) {
  if (suit === SUIT.HEARTS || suit === SUIT.DIAMONDS) return '#FF0000';
  return '#000000';
}

enum SUIT {
  SPADES = '♠',
  CLUBS = '♣',
  DIAMONDS = '♦',
  HEARTS = '♥️',
}

enum RANK {
  A = 'A',
  TWO = '2',
  THREE = '3',
  FOUR = '4',
  FIVE = '5',
  SIX = '6',
  SEVEN = '7',
  EIGHT = '8',
  NINE = '9',
  TEN = '10',
  J = 'J',
  Q = 'Q',
  K = 'K',
}

export class Card {
  constructor(public suit: SUIT = SUIT.SPADES, public rank: RANK = RANK.A) {}

  deserialize(raw: any) {
    //do something here
    this.rank = RANK[raw.rank as keyof typeof RANK];
    this.suit = SUIT[raw.suit as keyof typeof SUIT];
  }
}

AddRemoteClass(Card, 'com.example.model.Card');

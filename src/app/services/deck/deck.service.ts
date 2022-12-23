import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from '../main/service.service';

@Injectable({
  providedIn: 'root',
})
export class DeckService {
  constructor(private service: Service) {
  }

  public shuffle(): Observable<any> {
    return this.service.makeGetRequest('/shuffle');
  }

  public deal(): Observable<any> {
    return this.service.getMappedObservableForGetRequest('/deal', new HttpParams() , "com.example.model.Card");
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DogsService {
  constructor(private https: HttpClient) {}

  public getRandomDog(): Observable<any> {
    return this.https.get('https://dog.ceo/api/breeds/image/random');
  }
}

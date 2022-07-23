import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CatsService {
  catChance: number = 4;

  constructor(private https: HttpClient) {}

  public getRandomCatChance(): number {
    let randomCatChance;
    randomCatChance = Math.floor(Math.random() * this.catChance) + 1;
    return randomCatChance;
  }

  public RandomCatNot1(): number {
    let randomCatChance;
    randomCatChance = Math.floor(Math.random() * this.catChance) + 2;
    return randomCatChance;
  }

  public getRandomCat(): Observable<any> {
    return this.https.get('https://api.thecatapi.com/v1/images/search');
  }
}

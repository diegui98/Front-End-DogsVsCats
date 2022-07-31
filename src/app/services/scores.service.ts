import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ScoresService {
  constructor(private https: HttpClient) {}

  public getPetScore(pet: string, url: string): Observable<any> {
    return this.https.get(
      environment.urlBackEnd + 'dogscats/' + pet + '/' + url
    );
  }

  public savePetScore(pet: string, obj: any) {
    return this.https.post(
      environment.urlBackEnd + 'dogscats/' + pet + '/create',
      obj
    );
  }

  public fixScoresUrl(url: string) {
    let urlEncoded: any = encodeURIComponent(url);
    let urlFixed: any = urlEncoded.replace(/\%/g, '_-_');
    return urlFixed;
  }
}

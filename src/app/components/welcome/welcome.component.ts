import { Component, OnInit } from '@angular/core';
import { DogsService } from 'src/app/services/dogs.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {
  randomDog1!: string;
  randomDog2!: string;

  constructor(private dogsService: DogsService) {}

  ngOnInit() {
    this.dogsService.getRandomDog().subscribe((data) => {
      this.randomDog1 = data.message;
    });
    this.dogsService.getRandomDog().subscribe((data) => {
      this.randomDog2 = data.message;
    });
  }
}

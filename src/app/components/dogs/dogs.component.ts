import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CatsService } from 'src/app/services/cats.service';
import { DogsService } from 'src/app/services/dogs.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dogs',
  templateUrl: './dogs.component.html',
  styleUrls: ['./dogs.component.css'],
})
export class DogsComponent implements OnInit {
  randomDog!: string;
  randomCat!: string;
  randomDogAvg: number = 9;
  badLastRating: boolean = false;
  randomCatChance!: number;

  constructor(
    private dogsService: DogsService,
    private catsService: CatsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.dogsService.getRandomDog().subscribe((data) => {
      this.randomDog = data.message;
    });
  }

  onRateButton(rate: number) {
    if (this.randomCatChance !== 1) {
      if (rate == 1) {
        this.badLastRating = true;
        Swal.fire({
          icon: 'question',
          title: 'SERIOUSLY???',
          text: 'Ok... That was probably a missclick, let me help you.',
          confirmButtonText: 'Next Dog!',
          footer: 'This dog new Avg is: ' + this.randomDogAvg,
        }).then((result) => {
          if (result.isConfirmed) {
            this.dogsService.getRandomDog().subscribe((data) => {
              this.randomDog = data.message;
            });
          } else if (result.dismiss) {
            this.dogsService.getRandomDog().subscribe((data) => {
              this.randomDog = data.message;
            });
          }
        });
      }
      if (rate >= 2 && rate <= 3) {
        this.badLastRating = true;
        Swal.fire({
          icon: 'error',
          title: 'Poor Dog...',
          text: "That can't be true, there is no ugly dogs! Please be honest next time , this is very important for them.",
          confirmButtonText: 'Next Dog!',
          footer: 'This dog new Avg is: ' + this.randomDogAvg,
        }).then((result) => {
          if (result.isConfirmed) {
            this.dogsService.getRandomDog().subscribe((data) => {
              this.randomDog = data.message;
            });
          } else if (result.dismiss) {
            this.dogsService.getRandomDog().subscribe((data) => {
              this.randomDog = data.message;
            });
          }
        });
      }
      if (rate >= 4 && rate <= 6) {
        this.badLastRating = true;
        Swal.fire({
          icon: 'warning',
          title: 'Oops...',
          text: 'That dog was trying his best! Please think about that with our next dog.',
          confirmButtonText: 'Next Dog!',
          footer: 'This dog new Avg is: ' + this.randomDogAvg,
        }).then((result) => {
          if (result.isConfirmed) {
            this.dogsService.getRandomDog().subscribe((data) => {
              this.randomDog = data.message;
            });
          } else if (result.dismiss) {
            this.dogsService.getRandomDog().subscribe((data) => {
              this.randomDog = data.message;
            });
          }
        });
      }
      if (rate >= 7 && rate <= 9) {
        this.badLastRating = false;
        Swal.fire({
          icon: 'success',
          title: 'Awesome',
          text: 'That dog was really cute, Good Job! Please continue',
          confirmButtonText: 'Next Dog!',
          footer: 'This dog new Avg is: ' + this.randomDogAvg,
        }).then((result) => {
          if (result.isConfirmed) {
            this.dogsService.getRandomDog().subscribe((data) => {
              this.randomDog = data.message;
            });
          } else if (result.dismiss) {
            this.dogsService.getRandomDog().subscribe((data) => {
              this.randomDog = data.message;
            });
          }
        });
      }
      if (rate == 10) {
        this.badLastRating = false;
        Swal.fire({
          icon: 'info',
          title: 'Good Boy!',
          text: 'A Perfect Dog!',
          confirmButtonText: 'Next Dog!',
          footer: 'This dog new Avg is: ' + this.randomDogAvg,
        }).then((result) => {
          if (result.isConfirmed) {
            this.dogsService.getRandomDog().subscribe((data) => {
              this.randomDog = data.message;
            });
          } else if (result.dismiss) {
            this.dogsService.getRandomDog().subscribe((data) => {
              this.randomDog = data.message;
            });
          }
        });
      }
      this.randomCatChance = this.catsService.getRandomCatChance();
      if (this.randomCatChance == 1) {
        this.catsService.getRandomCat().subscribe((data) => {
          this.randomCat = data[0].url;
        });
      }
      return;
    }
    if (this.randomCatChance == 1) {
      Swal.fire({
        icon: 'question',
        title: 'A Cat???',
        text: 'How did it end here??',
        confirmButtonText: 'I Like Cats Too!',
        showDenyButton: true,
        denyButtonText: 'More Dogs Please!',
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/dogsVsCats']);
        } else if (result.dismiss) {
          this.randomCatChance = this.catsService.RandomCatNot1();
        } else if (result.isDenied) {
          this.randomCatChance = this.catsService.RandomCatNot1();
        }
      });
    }
  }
}

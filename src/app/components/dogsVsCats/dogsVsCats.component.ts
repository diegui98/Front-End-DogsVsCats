import { Component, OnInit } from '@angular/core';
import { CatsService } from 'src/app/services/cats.service';
import { DogsService } from 'src/app/services/dogs.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dogsVsCats',
  templateUrl: './dogsVsCats.component.html',
  styleUrls: ['./dogsVsCats.component.css'],
})
export class DogsVsCatsComponent implements OnInit {
  randomDog!: string;
  randomDogAvg: number = 10;
  randomCat!: string;
  badLastRating: boolean = false;
  petSelected: boolean = false;
  petToRate!: string;

  constructor(
    private dogsService: DogsService,
    private catsService: CatsService
  ) {}

  ngOnInit() {
    this.dogsService.getRandomDog().subscribe((data) => {
      this.randomDog = data.message;
    });
    this.catsService.getRandomCat().subscribe((data) => {
      this.randomCat = data[0].url;
    });
  }

  petSelection(pet: string) {
    this.petToRate = pet;
    this.petSelected = true;
  }

  onRateButton(rate: number) {
    if (this.petToRate == 'dog') {
      if (rate == 1) {
        this.badLastRating = true;
        Swal.fire({
          icon: 'question',
          title: 'SERIOUSLY???',
          text: 'Ok... That was probably a missclick, let me help you.',
          confirmButtonText: 'Next Battle!',
          footer: 'This dog new Avg is: ' + this.randomDogAvg,
        }).then((result) => {
          if (result.isConfirmed) {
            this.dogsService.getRandomDog().subscribe((data) => {
              this.randomDog = data.message;
            });
            this.catsService.getRandomCat().subscribe((data) => {
              this.randomCat = data[0].url;
            });
          } else if (result.dismiss) {
            this.dogsService.getRandomDog().subscribe((data) => {
              this.randomDog = data.message;
            });
            this.catsService.getRandomCat().subscribe((data) => {
              this.randomCat = data[0].url;
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
          confirmButtonText: 'Next Battle!',
          footer: 'This dog new Avg is: ' + this.randomDogAvg,
        }).then((result) => {
          if (result.isConfirmed) {
            this.dogsService.getRandomDog().subscribe((data) => {
              this.randomDog = data.message;
            });
            this.catsService.getRandomCat().subscribe((data) => {
              this.randomCat = data[0].url;
            });
          } else if (result.dismiss) {
            this.dogsService.getRandomDog().subscribe((data) => {
              this.randomDog = data.message;
            });
            this.catsService.getRandomCat().subscribe((data) => {
              this.randomCat = data[0].url;
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
          confirmButtonText: 'Next Battle!',
          footer: 'This dog new Avg is: ' + this.randomDogAvg,
        }).then((result) => {
          if (result.isConfirmed) {
            this.dogsService.getRandomDog().subscribe((data) => {
              this.randomDog = data.message;
            });
            this.catsService.getRandomCat().subscribe((data) => {
              this.randomCat = data[0].url;
            });
          } else if (result.dismiss) {
            this.dogsService.getRandomDog().subscribe((data) => {
              this.randomDog = data.message;
            });
            this.catsService.getRandomCat().subscribe((data) => {
              this.randomCat = data[0].url;
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
          confirmButtonText: 'Next Battle!',
          footer: 'This dog new Avg is: ' + this.randomDogAvg,
        }).then((result) => {
          if (result.isConfirmed) {
            this.dogsService.getRandomDog().subscribe((data) => {
              this.randomDog = data.message;
            });
            this.catsService.getRandomCat().subscribe((data) => {
              this.randomCat = data[0].url;
            });
          } else if (result.dismiss) {
            this.dogsService.getRandomDog().subscribe((data) => {
              this.randomDog = data.message;
            });
            this.catsService.getRandomCat().subscribe((data) => {
              this.randomCat = data[0].url;
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
          confirmButtonText: 'Next Battle!',
          footer: 'This dog new Avg is: ' + this.randomDogAvg,
        }).then((result) => {
          if (result.isConfirmed) {
            this.dogsService.getRandomDog().subscribe((data) => {
              this.randomDog = data.message;
            });
            this.catsService.getRandomCat().subscribe((data) => {
              this.randomCat = data[0].url;
            });
          } else if (result.dismiss) {
            this.dogsService.getRandomDog().subscribe((data) => {
              this.randomDog = data.message;
            });
            this.catsService.getRandomCat().subscribe((data) => {
              this.randomCat = data[0].url;
            });
          }
        });
      }
    }
    if (this.petToRate == 'cat') {
      if (rate == 1) {
        this.badLastRating = true;
        Swal.fire({
          icon: 'question',
          title: 'SERIOUSLY???',
          text: 'Ok... That was probably a missclick, let me help you.',
          confirmButtonText: 'Next Battle!',
          footer: 'This cat new Avg is: ' + this.randomDogAvg,
        }).then((result) => {
          if (result.isConfirmed) {
            this.dogsService.getRandomDog().subscribe((data) => {
              this.randomDog = data.message;
            });
            this.catsService.getRandomCat().subscribe((data) => {
              this.randomCat = data[0].url;
            });
          } else if (result.dismiss) {
            this.dogsService.getRandomDog().subscribe((data) => {
              this.randomDog = data.message;
            });
            this.catsService.getRandomCat().subscribe((data) => {
              this.randomCat = data[0].url;
            });
          }
        });
      }
      if (rate >= 2 && rate <= 3) {
        this.badLastRating = true;
        Swal.fire({
          icon: 'error',
          title: 'Poor cat...',
          text: "That can't be true, there is no ugly cats! Please be honest next time , this is very important for them.",
          confirmButtonText: 'Next Battle!',
          footer: 'This cat new Avg is: ' + this.randomDogAvg,
        }).then((result) => {
          if (result.isConfirmed) {
            this.dogsService.getRandomDog().subscribe((data) => {
              this.randomDog = data.message;
            });
            this.catsService.getRandomCat().subscribe((data) => {
              this.randomCat = data[0].url;
            });
          } else if (result.dismiss) {
            this.dogsService.getRandomDog().subscribe((data) => {
              this.randomDog = data.message;
            });
            this.catsService.getRandomCat().subscribe((data) => {
              this.randomCat = data[0].url;
            });
          }
        });
      }
      if (rate >= 4 && rate <= 6) {
        this.badLastRating = true;
        Swal.fire({
          icon: 'warning',
          title: 'Oops...',
          text: 'That cat was trying his best! Please think about that with our next cat.',
          confirmButtonText: 'Next Battle!',
          footer: 'This cat new Avg is: ' + this.randomDogAvg,
        }).then((result) => {
          if (result.isConfirmed) {
            this.dogsService.getRandomDog().subscribe((data) => {
              this.randomDog = data.message;
            });
            this.catsService.getRandomCat().subscribe((data) => {
              this.randomCat = data[0].url;
            });
          } else if (result.dismiss) {
            this.dogsService.getRandomDog().subscribe((data) => {
              this.randomDog = data.message;
            });
            this.catsService.getRandomCat().subscribe((data) => {
              this.randomCat = data[0].url;
            });
          }
        });
      }
      if (rate >= 7 && rate <= 9) {
        this.badLastRating = false;
        Swal.fire({
          icon: 'success',
          title: 'Awesome',
          text: 'That cat was really cute, Good Job! Please continue',
          confirmButtonText: 'Next Battle!',
          footer: 'This cat new Avg is: ' + this.randomDogAvg,
        }).then((result) => {
          if (result.isConfirmed) {
            this.dogsService.getRandomDog().subscribe((data) => {
              this.randomDog = data.message;
            });
            this.catsService.getRandomCat().subscribe((data) => {
              this.randomCat = data[0].url;
            });
          } else if (result.dismiss) {
            this.dogsService.getRandomDog().subscribe((data) => {
              this.randomDog = data.message;
            });
            this.catsService.getRandomCat().subscribe((data) => {
              this.randomCat = data[0].url;
            });
          }
        });
      }
      if (rate == 10) {
        this.badLastRating = false;
        Swal.fire({
          icon: 'info',
          title: 'Good Boy!',
          text: 'A Perfect Cat!',
          confirmButtonText: 'Next Battle!',
          footer: 'This cat new Avg is: ' + this.randomDogAvg,
        }).then((result) => {
          if (result.isConfirmed) {
            this.dogsService.getRandomDog().subscribe((data) => {
              this.randomDog = data.message;
            });
            this.catsService.getRandomCat().subscribe((data) => {
              this.randomCat = data[0].url;
            });
          } else if (result.dismiss) {
            this.dogsService.getRandomDog().subscribe((data) => {
              this.randomDog = data.message;
            });
            this.catsService.getRandomCat().subscribe((data) => {
              this.randomCat = data[0].url;
            });
          }
        });
      }
    }
  }
}

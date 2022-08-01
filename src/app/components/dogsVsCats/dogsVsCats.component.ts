import { Component, OnInit } from '@angular/core';
import { CatsService } from 'src/app/services/cats.service';
import { DogsService } from 'src/app/services/dogs.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import Swal from 'sweetalert2';
import { DogScore } from 'src/app/classes/dog-score';
import { CatScore } from 'src/app/classes/cat-score';
import { ScoresService } from 'src/app/services/scores.service';
import { ScoreToSave } from 'src/app/classes/score-to-save';

@Component({
  selector: 'app-dogsVsCats',
  templateUrl: './dogsVsCats.component.html',
  styleUrls: ['./dogsVsCats.component.css'],
})
export class DogsVsCatsComponent implements OnInit {
  randomDog!: string;
  dogScore!: DogScore;
  randomCat!: string;
  catScore!: CatScore;
  badLastRating: boolean = false;
  petSelected: boolean = false;
  petToRate!: string;

  constructor(
    private dogsService: DogsService,
    private catsService: CatsService,
    private scoresService: ScoresService
  ) {}

  ngOnInit() {
    this.dogScore = new DogScore(10, 10, 0);
    this.catScore = new CatScore(9, 9, 0);

    //We load the first dog url to show
    this.dogsService.getRandomDog().subscribe((data) => {
      this.randomDog = data.message;
    });

    //we get the first dog scores to show
    this.scoresService
      .getPetScore('dog', this.scoresService.fixScoresUrl(this.randomDog))
      .subscribe((data) => {
        this.dogScore = data;
      });

    //We load the first cat url to show
    this.catsService.getRandomCat().subscribe((data) => {
      this.randomCat = data[0].url;
    });

    //we get the first cat scores to show
    this.scoresService
      .getPetScore('cat', this.scoresService.fixScoresUrl(this.randomCat))
      .subscribe((data) => {
        this.catScore = data;
      });
  }

  petSelection(pet: string) {
    this.petToRate = pet;
    this.petSelected = true;
  }

  onRateButton(rate: number) {
    //this only aplies when the user rates a dog
    if (this.petToRate == 'dog') {
      // Saves the score of the dog rated
      let newDogScore: ScoreToSave = {
        url: this.scoresService.fixScoresUrl(this.randomDog),
        score: rate,
      };
      this.scoresService.savePetScore('dog', newDogScore).subscribe(
        (data) => {},
        (err) => {
          // We load the new score of the same Dog to show the new Rating on the modal
          this.scoresService
            .getPetScore('dog', this.scoresService.fixScoresUrl(this.randomDog))
            .subscribe((data) => {
              this.dogScore = data;
              //if the user rates a dog then it shows a modal based on the rate number and then it loads a new dog and cat
              if (rate == 1) {
                this.badLastRating = true;
                Swal.fire({
                  icon: 'question',
                  title: 'SERIOUSLY???',
                  text: 'Ok... That was probably a missclick, let me help you.',
                  confirmButtonText: 'Next Battle!',
                  footer: 'This dog new Avg is: ' + this.dogScore.dogRating,
                }).then((result) => {
                  if (result.isConfirmed) {
                    this.dogsService.getRandomDog().subscribe((data) => {
                      this.randomDog = data.message;
                      // Gets the info of the new dog
                      this.scoresService
                        .getPetScore(
                          'dog',
                          this.scoresService.fixScoresUrl(this.randomDog)
                        )
                        .subscribe((data) => {
                          this.dogScore = data;
                        });
                    });
                    this.catsService.getRandomCat().subscribe((data) => {
                      this.randomCat = data[0].url;
                      // Gets the info of the new cat
                      this.scoresService
                        .getPetScore(
                          'cat',
                          this.scoresService.fixScoresUrl(this.randomCat)
                        )
                        .subscribe((data) => {
                          this.catScore = data;
                        });
                    });
                  } else if (result.dismiss) {
                    this.dogsService.getRandomDog().subscribe((data) => {
                      this.randomDog = data.message;
                      // Gets the info of the new dog
                      this.scoresService
                        .getPetScore(
                          'dog',
                          this.scoresService.fixScoresUrl(this.randomDog)
                        )
                        .subscribe((data) => {
                          this.dogScore = data;
                        });
                    });
                    this.catsService.getRandomCat().subscribe((data) => {
                      this.randomCat = data[0].url;
                      // Gets the info of the new cat
                      this.scoresService
                        .getPetScore(
                          'cat',
                          this.scoresService.fixScoresUrl(this.randomCat)
                        )
                        .subscribe((data) => {
                          this.catScore = data;
                        });
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
                  footer: 'This dog new Avg is: ' + this.dogScore.dogRating,
                }).then((result) => {
                  if (result.isConfirmed) {
                    this.dogsService.getRandomDog().subscribe((data) => {
                      this.randomDog = data.message;
                      // Gets the info of the new dog
                      this.scoresService
                        .getPetScore(
                          'dog',
                          this.scoresService.fixScoresUrl(this.randomDog)
                        )
                        .subscribe((data) => {
                          this.dogScore = data;
                        });
                    });
                    this.catsService.getRandomCat().subscribe((data) => {
                      this.randomCat = data[0].url;
                      // Gets the info of the new cat
                      this.scoresService
                        .getPetScore(
                          'cat',
                          this.scoresService.fixScoresUrl(this.randomCat)
                        )
                        .subscribe((data) => {
                          this.catScore = data;
                        });
                    });
                  } else if (result.dismiss) {
                    this.dogsService.getRandomDog().subscribe((data) => {
                      this.randomDog = data.message;
                      // Gets the info of the new dog
                      this.scoresService
                        .getPetScore(
                          'dog',
                          this.scoresService.fixScoresUrl(this.randomDog)
                        )
                        .subscribe((data) => {
                          this.dogScore = data;
                        });
                    });
                    this.catsService.getRandomCat().subscribe((data) => {
                      this.randomCat = data[0].url;
                      // Gets the info of the new cat
                      this.scoresService
                        .getPetScore(
                          'cat',
                          this.scoresService.fixScoresUrl(this.randomCat)
                        )
                        .subscribe((data) => {
                          this.catScore = data;
                        });
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
                  footer: 'This dog new Avg is: ' + this.dogScore.dogRating,
                }).then((result) => {
                  if (result.isConfirmed) {
                    this.dogsService.getRandomDog().subscribe((data) => {
                      this.randomDog = data.message;
                      // Gets the info of the new dog
                      this.scoresService
                        .getPetScore(
                          'dog',
                          this.scoresService.fixScoresUrl(this.randomDog)
                        )
                        .subscribe((data) => {
                          this.dogScore = data;
                        });
                    });
                    this.catsService.getRandomCat().subscribe((data) => {
                      this.randomCat = data[0].url;
                      // Gets the info of the new cat
                      this.scoresService
                        .getPetScore(
                          'cat',
                          this.scoresService.fixScoresUrl(this.randomCat)
                        )
                        .subscribe((data) => {
                          this.catScore = data;
                        });
                    });
                  } else if (result.dismiss) {
                    this.dogsService.getRandomDog().subscribe((data) => {
                      this.randomDog = data.message;
                      // Gets the info of the new dog
                      this.scoresService
                        .getPetScore(
                          'dog',
                          this.scoresService.fixScoresUrl(this.randomDog)
                        )
                        .subscribe((data) => {
                          this.dogScore = data;
                        });
                    });
                    this.catsService.getRandomCat().subscribe((data) => {
                      this.randomCat = data[0].url;
                      // Gets the info of the new cat
                      this.scoresService
                        .getPetScore(
                          'cat',
                          this.scoresService.fixScoresUrl(this.randomCat)
                        )
                        .subscribe((data) => {
                          this.catScore = data;
                        });
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
                  footer: 'This dog new Avg is: ' + this.dogScore.dogRating,
                }).then((result) => {
                  if (result.isConfirmed) {
                    this.dogsService.getRandomDog().subscribe((data) => {
                      this.randomDog = data.message;
                      // Gets the info of the new dog
                      this.scoresService
                        .getPetScore(
                          'dog',
                          this.scoresService.fixScoresUrl(this.randomDog)
                        )
                        .subscribe((data) => {
                          this.dogScore = data;
                        });
                    });
                    this.catsService.getRandomCat().subscribe((data) => {
                      this.randomCat = data[0].url;
                      // Gets the info of the new cat
                      this.scoresService
                        .getPetScore(
                          'cat',
                          this.scoresService.fixScoresUrl(this.randomCat)
                        )
                        .subscribe((data) => {
                          this.catScore = data;
                        });
                    });
                  } else if (result.dismiss) {
                    this.dogsService.getRandomDog().subscribe((data) => {
                      this.randomDog = data.message;
                      // Gets the info of the new dog
                      this.scoresService
                        .getPetScore(
                          'dog',
                          this.scoresService.fixScoresUrl(this.randomDog)
                        )
                        .subscribe((data) => {
                          this.dogScore = data;
                        });
                    });
                    this.catsService.getRandomCat().subscribe((data) => {
                      this.randomCat = data[0].url;
                      // Gets the info of the new cat
                      this.scoresService
                        .getPetScore(
                          'cat',
                          this.scoresService.fixScoresUrl(this.randomCat)
                        )
                        .subscribe((data) => {
                          this.catScore = data;
                        });
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
                  footer: 'This dog new Avg is: ' + this.dogScore.dogRating,
                }).then((result) => {
                  if (result.isConfirmed) {
                    this.dogsService.getRandomDog().subscribe((data) => {
                      this.randomDog = data.message;
                      // Gets the info of the new dog
                      this.scoresService
                        .getPetScore(
                          'dog',
                          this.scoresService.fixScoresUrl(this.randomDog)
                        )
                        .subscribe((data) => {
                          this.dogScore = data;
                        });
                    });
                    this.catsService.getRandomCat().subscribe((data) => {
                      this.randomCat = data[0].url;
                      // Gets the info of the new cat
                      this.scoresService
                        .getPetScore(
                          'cat',
                          this.scoresService.fixScoresUrl(this.randomCat)
                        )
                        .subscribe((data) => {
                          this.catScore = data;
                        });
                    });
                  } else if (result.dismiss) {
                    this.dogsService.getRandomDog().subscribe((data) => {
                      this.randomDog = data.message;
                      // Gets the info of the new dog
                      this.scoresService
                        .getPetScore(
                          'dog',
                          this.scoresService.fixScoresUrl(this.randomDog)
                        )
                        .subscribe((data) => {
                          this.dogScore = data;
                        });
                    });
                    this.catsService.getRandomCat().subscribe((data) => {
                      this.randomCat = data[0].url;
                      // Gets the info of the new cat
                      this.scoresService
                        .getPetScore(
                          'cat',
                          this.scoresService.fixScoresUrl(this.randomCat)
                        )
                        .subscribe((data) => {
                          this.catScore = data;
                        });
                    });
                  }
                });
              }
            });
        }
      );
    }
    //this only aplies when the user rates a cat
    if (this.petToRate == 'cat') {
      // Saves the score of the cat rated
      let newCatScore: ScoreToSave = {
        url: this.scoresService.fixScoresUrl(this.randomCat),
        score: rate,
      };
      this.scoresService.savePetScore('cat', newCatScore).subscribe(
        (data) => {},
        (err) => {
          // We load the new score of the same Cat to show the new Rating on the modal
          this.scoresService
            .getPetScore('cat', this.scoresService.fixScoresUrl(this.randomCat))
            .subscribe((data) => {
              this.catScore = data;
              //if the user rates a cat then it shows a modal based on the rate number and then it loads a new dog and cat
              if (rate == 1) {
                this.badLastRating = true;
                Swal.fire({
                  icon: 'question',
                  title: 'SERIOUSLY???',
                  text: 'Ok... That was probably a missclick, let me help you.',
                  confirmButtonText: 'Next Battle!',
                  footer: 'This cat new Avg is: ' + this.catScore.catRating,
                }).then((result) => {
                  if (result.isConfirmed) {
                    this.dogsService.getRandomDog().subscribe((data) => {
                      this.randomDog = data.message;
                      // Gets the info of the new dog
                      this.scoresService
                        .getPetScore(
                          'dog',
                          this.scoresService.fixScoresUrl(this.randomDog)
                        )
                        .subscribe((data) => {
                          this.dogScore = data;
                        });
                    });
                    this.catsService.getRandomCat().subscribe((data) => {
                      this.randomCat = data[0].url;
                      // Gets the info of the new cat
                      this.scoresService
                        .getPetScore(
                          'cat',
                          this.scoresService.fixScoresUrl(this.randomCat)
                        )
                        .subscribe((data) => {
                          this.catScore = data;
                        });
                    });
                  } else if (result.dismiss) {
                    this.dogsService.getRandomDog().subscribe((data) => {
                      this.randomDog = data.message;
                      // Gets the info of the new dog
                      this.scoresService
                        .getPetScore(
                          'dog',
                          this.scoresService.fixScoresUrl(this.randomDog)
                        )
                        .subscribe((data) => {
                          this.dogScore = data;
                        });
                    });
                    this.catsService.getRandomCat().subscribe((data) => {
                      this.randomCat = data[0].url;
                      // Gets the info of the new cat
                      this.scoresService
                        .getPetScore(
                          'cat',
                          this.scoresService.fixScoresUrl(this.randomCat)
                        )
                        .subscribe((data) => {
                          this.catScore = data;
                        });
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
                  footer: 'This cat new Avg is: ' + this.catScore.catRating,
                }).then((result) => {
                  if (result.isConfirmed) {
                    this.dogsService.getRandomDog().subscribe((data) => {
                      this.randomDog = data.message;
                      // Gets the info of the new dog
                      this.scoresService
                        .getPetScore(
                          'dog',
                          this.scoresService.fixScoresUrl(this.randomDog)
                        )
                        .subscribe((data) => {
                          this.dogScore = data;
                        });
                    });
                    this.catsService.getRandomCat().subscribe((data) => {
                      this.randomCat = data[0].url;
                      // Gets the info of the new cat
                      this.scoresService
                        .getPetScore(
                          'cat',
                          this.scoresService.fixScoresUrl(this.randomCat)
                        )
                        .subscribe((data) => {
                          this.catScore = data;
                        });
                    });
                  } else if (result.dismiss) {
                    this.dogsService.getRandomDog().subscribe((data) => {
                      this.randomDog = data.message;
                      // Gets the info of the new dog
                      this.scoresService
                        .getPetScore(
                          'dog',
                          this.scoresService.fixScoresUrl(this.randomDog)
                        )
                        .subscribe((data) => {
                          this.dogScore = data;
                        });
                    });
                    this.catsService.getRandomCat().subscribe((data) => {
                      this.randomCat = data[0].url;
                      // Gets the info of the new cat
                      this.scoresService
                        .getPetScore(
                          'cat',
                          this.scoresService.fixScoresUrl(this.randomCat)
                        )
                        .subscribe((data) => {
                          this.catScore = data;
                        });
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
                  footer: 'This cat new Avg is: ' + this.catScore.catRating,
                }).then((result) => {
                  if (result.isConfirmed) {
                    this.dogsService.getRandomDog().subscribe((data) => {
                      this.randomDog = data.message;
                      // Gets the info of the new dog
                      this.scoresService
                        .getPetScore(
                          'dog',
                          this.scoresService.fixScoresUrl(this.randomDog)
                        )
                        .subscribe((data) => {
                          this.dogScore = data;
                        });
                    });
                    this.catsService.getRandomCat().subscribe((data) => {
                      this.randomCat = data[0].url;
                      // Gets the info of the new cat
                      this.scoresService
                        .getPetScore(
                          'cat',
                          this.scoresService.fixScoresUrl(this.randomCat)
                        )
                        .subscribe((data) => {
                          this.catScore = data;
                        });
                    });
                  } else if (result.dismiss) {
                    this.dogsService.getRandomDog().subscribe((data) => {
                      this.randomDog = data.message;
                      // Gets the info of the new dog
                      this.scoresService
                        .getPetScore(
                          'dog',
                          this.scoresService.fixScoresUrl(this.randomDog)
                        )
                        .subscribe((data) => {
                          this.dogScore = data;
                        });
                    });
                    this.catsService.getRandomCat().subscribe((data) => {
                      this.randomCat = data[0].url;
                      // Gets the info of the new cat
                      this.scoresService
                        .getPetScore(
                          'cat',
                          this.scoresService.fixScoresUrl(this.randomCat)
                        )
                        .subscribe((data) => {
                          this.catScore = data;
                        });
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
                  footer: 'This cat new Avg is: ' + this.catScore.catRating,
                }).then((result) => {
                  if (result.isConfirmed) {
                    this.dogsService.getRandomDog().subscribe((data) => {
                      this.randomDog = data.message;
                      // Gets the info of the new dog
                      this.scoresService
                        .getPetScore(
                          'dog',
                          this.scoresService.fixScoresUrl(this.randomDog)
                        )
                        .subscribe((data) => {
                          this.dogScore = data;
                        });
                    });
                    this.catsService.getRandomCat().subscribe((data) => {
                      this.randomCat = data[0].url;
                      // Gets the info of the new cat
                      this.scoresService
                        .getPetScore(
                          'cat',
                          this.scoresService.fixScoresUrl(this.randomCat)
                        )
                        .subscribe((data) => {
                          this.catScore = data;
                        });
                    });
                  } else if (result.dismiss) {
                    this.dogsService.getRandomDog().subscribe((data) => {
                      this.randomDog = data.message;
                      // Gets the info of the new dog
                      this.scoresService
                        .getPetScore(
                          'dog',
                          this.scoresService.fixScoresUrl(this.randomDog)
                        )
                        .subscribe((data) => {
                          this.dogScore = data;
                        });
                    });
                    this.catsService.getRandomCat().subscribe((data) => {
                      this.randomCat = data[0].url;
                      // Gets the info of the new cat
                      this.scoresService
                        .getPetScore(
                          'cat',
                          this.scoresService.fixScoresUrl(this.randomCat)
                        )
                        .subscribe((data) => {
                          this.catScore = data;
                        });
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
                  footer: 'This cat new Avg is: ' + this.catScore.catRating,
                }).then((result) => {
                  if (result.isConfirmed) {
                    this.dogsService.getRandomDog().subscribe((data) => {
                      this.randomDog = data.message;
                      // Gets the info of the new dog
                      this.scoresService
                        .getPetScore(
                          'dog',
                          this.scoresService.fixScoresUrl(this.randomDog)
                        )
                        .subscribe((data) => {
                          this.dogScore = data;
                        });
                    });
                    this.catsService.getRandomCat().subscribe((data) => {
                      this.randomCat = data[0].url;
                      // Gets the info of the new cat
                      this.scoresService
                        .getPetScore(
                          'cat',
                          this.scoresService.fixScoresUrl(this.randomCat)
                        )
                        .subscribe((data) => {
                          this.catScore = data;
                        });
                    });
                  } else if (result.dismiss) {
                    this.dogsService.getRandomDog().subscribe((data) => {
                      this.randomDog = data.message;
                      // Gets the info of the new dog
                      this.scoresService
                        .getPetScore(
                          'dog',
                          this.scoresService.fixScoresUrl(this.randomDog)
                        )
                        .subscribe((data) => {
                          this.dogScore = data;
                        });
                    });
                    this.catsService.getRandomCat().subscribe((data) => {
                      this.randomCat = data[0].url;
                      // Gets the info of the new cat
                      this.scoresService
                        .getPetScore(
                          'cat',
                          this.scoresService.fixScoresUrl(this.randomCat)
                        )
                        .subscribe((data) => {
                          this.catScore = data;
                        });
                    });
                  }
                });
              }
            });
        }
      );
    }
    this.petToRate = '';
    this.petSelected = !this.petSelected;
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { throwIfEmpty } from 'rxjs';
import { CatScore } from 'src/app/classes/cat-score';
import { DogScore } from 'src/app/classes/dog-score';
import { ScoreToSave } from 'src/app/classes/score-to-save';
import { CatsService } from 'src/app/services/cats.service';
import { DogsService } from 'src/app/services/dogs.service';
import { ScoresService } from 'src/app/services/scores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dogs',
  templateUrl: './dogs.component.html',
  styleUrls: ['./dogs.component.css'],
})
export class DogsComponent implements OnInit {
  randomDog!: string;
  dogScore!: DogScore;
  randomCat!: string;
  catScore!: CatScore;
  randomDogAvg: number = 9;
  badLastRating: boolean = false;
  randomCatChance!: number;

  constructor(
    private dogsService: DogsService,
    private catsService: CatsService,
    private scoresService: ScoresService,
    private router: Router
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
  }

  onRateButton(rate: number) {
    //this only aplies when the user rates a dog
    if (this.randomCatChance !== 1) {
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
              //if the user rates a dog then it shows a modal based on the rate number and then it loads a new dog

              if (rate == 1) {
                this.badLastRating = true;
                Swal.fire({
                  icon: 'question',
                  title: 'SERIOUSLY???',
                  text: 'Ok... That was probably a missclick, let me help you.',
                  confirmButtonText: 'Next Dog!',
                  footer: 'This dog new Avg is: ' + this.dogScore.dogRating,
                }).then((result) => {
                  if (result.isConfirmed) {
                    this.dogsService.getRandomDog().subscribe((data) => {
                      this.randomDog = data.message; // Gets the info of the new dog
                      this.scoresService
                        .getPetScore(
                          'dog',
                          this.scoresService.fixScoresUrl(this.randomDog)
                        )
                        .subscribe((data) => {
                          this.dogScore = data;
                        });
                    });
                  } else if (result.dismiss) {
                    this.dogsService.getRandomDog().subscribe((data) => {
                      this.randomDog = data.message; // Gets the info of the new dog
                      this.scoresService
                        .getPetScore(
                          'dog',
                          this.scoresService.fixScoresUrl(this.randomDog)
                        )
                        .subscribe((data) => {
                          this.dogScore = data;
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
                  confirmButtonText: 'Next Dog!',
                  footer: 'This dog new Avg is: ' + this.dogScore.dogRating,
                }).then((result) => {
                  if (result.isConfirmed) {
                    this.dogsService.getRandomDog().subscribe((data) => {
                      this.randomDog = data.message; // Gets the info of the new dog
                      this.scoresService
                        .getPetScore(
                          'dog',
                          this.scoresService.fixScoresUrl(this.randomDog)
                        )
                        .subscribe((data) => {
                          this.dogScore = data;
                        });
                    });
                  } else if (result.dismiss) {
                    this.dogsService.getRandomDog().subscribe((data) => {
                      this.randomDog = data.message; // Gets the info of the new dog
                      this.scoresService
                        .getPetScore(
                          'dog',
                          this.scoresService.fixScoresUrl(this.randomDog)
                        )
                        .subscribe((data) => {
                          this.dogScore = data;
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
                  confirmButtonText: 'Next Dog!',
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
                  }
                });
              }

              // Generates a random number, if it is == 1 it will load a cat to rate ang get the cats scores
              this.randomCatChance = this.catsService.getRandomCatChance();
              if (this.randomCatChance == 1) {
                this.catsService.getRandomCat().subscribe((data) => {
                  this.randomCat = data[0].url;
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
              return;
            });
        }
      );
    }

    //this only aplies when the user rates a cat
    if (this.randomCatChance == 1) {
      // Saves the score of the cat rated
      let newCatScore: ScoreToSave = {
        url: this.scoresService.fixScoresUrl(this.randomCat),
        score: rate,
      };
      this.scoresService.savePetScore('cat', newCatScore).subscribe(
        (data) => {},
        (err) => {
          // We load the new score of the same cat to show the new Rating on the modal
          this.scoresService
            .getPetScore('cat', this.scoresService.fixScoresUrl(this.randomCat))
            .subscribe((data) => {
              this.catScore = data;
              // if the user rates a cat, it givies de modal and the option to navigate to dogsvscats component, if denied then it changes the randomcatchance value
              Swal.fire({
                icon: 'question',
                title: 'A Cat???',
                text: 'How did it end here??',
                confirmButtonText: 'I Like Cats Too!',
                showDenyButton: true,
                denyButtonText: 'More Dogs Please!',
                footer: 'This cat new Avg is: ' + this.catScore.catRating,
              }).then((result) => {
                if (result.isConfirmed) {
                  this.router.navigate(['/dogsVsCats']);
                } else if (result.dismiss) {
                  this.randomCatChance = this.catsService.RandomCatNot1();
                } else if (result.isDenied) {
                  this.randomCatChance = this.catsService.RandomCatNot1();
                }
              });
            });
        }
      );
    }
  }
}

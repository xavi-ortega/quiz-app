import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Quiz } from 'src/app/interfaces/quiz';
import { QuizService } from 'src/app/services/quiz/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.page.html',
  styleUrls: ['./quiz.page.scss'],
})
export class QuizPage implements OnInit {
  id: string;

  quiz$: Observable<Quiz>;

  constructor(private quizService: QuizService, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params.id;

    this.quiz$ = this.quizService.get(this.id);
  }

  submit() {
    const results: any = {};

    this.quizService.sendResults(+this.id, results).subscribe((success) => {
      if (success) {
        // success feedback
      } else {
        // error sending results
      }
    });
  }
}

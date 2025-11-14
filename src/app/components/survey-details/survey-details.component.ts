import { Component, signal, inject, OnInit, OnDestroy } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Subject, takeUntil } from "rxjs";
import { QuestionCardComponent } from "../question-card/question-card.component";
import { SurveyService } from "../../services/survey.service";
import { Survey, Question } from "../../models/question.model";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "survey-details",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    QuestionCardComponent,
    FontAwesomeModule,
  ],
  templateUrl: "./survey-details.component.html",
  styleUrls: ["./survey-details.component.scss"],
})
export class SurveyDetailsComponent implements OnInit, OnDestroy {
  surveyId = "";
  private activatedRoute = inject(ActivatedRoute);
  survey: Survey = {} as Survey;
  error = "";
  private destroy$ = new Subject<void>();
  faPlus = faPlus;

  constructor(private surveyService: SurveyService) {
    this.activatedRoute.params.subscribe((params) => {
      this.surveyId = params["id"];
    });
    console.log("Loaded survey ID:", this.surveyId);

    this.surveyService.loadSurvey(this.surveyId).subscribe({
      next: (survey) => {
        // this.surveys = surveys;
      },
      error: (error) => {
        console.error("Error loading surveys:", error);
      },
    });
  }

  ngOnInit(): void {
    // Subscribe to survey changes
    this.surveyService.survey$
      .pipe(takeUntil(this.destroy$))
      .subscribe((survey) => {
        if (survey?.id) {
          this.survey = survey;
        }
      });
  }

  ngOnDestroy(): void {
    this.survey = null as any;
  }

  addQuestion(): void {
    const selectedSurvey = this.survey;
    console.log('selectedSurvey', selectedSurvey);
    const newQuestion: Question = {
      questionId: this.survey.questions.length + 1,
      questionType: 0,
      questionText: "",
      options: [],
      mandatoryInd: false,
      randomizeOptionsInd: false,
    };

    this.survey.questions = [...this.survey.questions, newQuestion];
    this.surveyService.saveSurvey(selectedSurvey);
  }

  updateQuestion(index: number, question: Question): void {
    this.survey.questions[index] = question;
    console.log('survey being passed in updateQuestion', this.survey);
    this.surveyService.saveSurvey(this.survey).subscribe();
  }

  deleteQuestion(index: number): void {
    this.survey.questions = this.survey.questions.filter((_, i) => i !== index);
    // Renumber questions
    this.survey.questions = this.survey.questions.map((q, i) => ({
      ...q,
      number: `Q${i + 1}`,
    }));
    this.surveyService.saveSurvey(this.survey).subscribe();
  }

}

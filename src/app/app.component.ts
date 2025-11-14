import { Component, OnInit, OnDestroy } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Subject } from "rxjs";
import { SurveyService } from "./services/survey.service";
import { Survey } from "./models/question.model";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { RouterLink, RouterOutlet } from "@angular/router";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    RouterLink,
    RouterOutlet,
  ],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit, OnDestroy {
  surveys: Survey[] = [];
  private destroy$ = new Subject<void>();

  constructor(private surveyService: SurveyService) {
    this.surveyService.getAllSurveys().subscribe({
      next: (surveys) => {
        this.surveys = surveys;
      },
      error: (error) => {
        console.error("Error loading surveys:", error);
      },
    });
  }

  ngOnInit(): void {
    // Subscribe to survey changes
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

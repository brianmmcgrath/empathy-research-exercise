import { Component, OnInit, OnDestroy } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Subject } from "rxjs";
import { SurveyService } from "../../services/survey.service";
import { Survey } from "../../models/question.model";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    RouterLink,
  ],
  templateUrl: "./survey-dashboard.component.html",
  styleUrls: ["./survey-dashboard.component.scss"],
})
export class SurveyDashboardComponent implements OnInit, OnDestroy {
  surveys: Survey[] = [];
  private destroy$ = new Subject<void>();

  constructor(private surveyService: SurveyService) {
    this.surveyService.getAllSurveys().subscribe({
      next: (surveys: any) => {
        this.surveys = surveys;
      },
      error: (error: any) => {
        console.error("Error loading surveys:", error);
      },
    });
  }

  ngOnInit(): void {
    // TODO: add setup for the dashboard page
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

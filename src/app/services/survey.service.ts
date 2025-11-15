import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, BehaviorSubject, throwError } from "rxjs";
import { catchError, tap} from "rxjs/operators";
import { Survey } from "../models/question.model";

@Injectable({
  providedIn: "root",
})
export class SurveyService {
  private apiUrl = "https://techtestapi1.azurewebsites.net";
  private apiKey = "brian@rassoodock.ie";

  private surveySubject = new BehaviorSubject<Survey | null>(null);
  public survey$ = this.surveySubject.asObservable();

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      "Content-Type": "application/json",
      "X-API-KEY": this.apiKey,
    });
  }

  getAllSurveys() {
    return this.http.get<Survey[]>(`${this.apiUrl}/survey`, {
      headers: this.getHeaders(),
    });
  }

  loadSurvey(id: string): Observable<Survey> {
    return this.http
      .get<Survey>(`${this.apiUrl}/survey/${id}`, {
        headers: this.getHeaders(),
      })
      .pipe(
        tap((survey) => this.surveySubject.next(survey)),
        catchError(this.handleError)
      );
  }

  saveSurvey(survey: Survey): Observable<Survey> {
    console.log(`Saving survey #${survey.id}`);
    survey.questions.forEach((question) => {
      if (typeof question.options === "string") {
        question.options = this.convertOptionsStringToArray(question.options);
      }
    });

    const method = survey.id ? "put" : "post";
    const url = survey.id
      ? `${this.apiUrl}/survey/${survey.id}`
      : `${this.apiUrl}/survey`;

    
    console.log('api url being hit', url);

    const validSurvey: Survey = {
      ...survey,
      questions: survey.questions.filter((q) => !!q.questionText && Array.isArray(q.options) && q.options.length > 1),
    };

    return this.http
      .request<Survey>(method, url, {
        body: validSurvey,
        headers: this.getHeaders(),
      })
      .pipe(
        tap((savedSurvey) => this.surveySubject.next(savedSurvey)),
        catchError(this.handleError)
      );
  }

  /**
   * Splits a string into an array of strings, using lines that start with '-' or '- ' as delimiters.
   * Each returned string will be the text following each delimiter.
   * Example:
   *   "- Option 1\n- Option 2" => ["Option 1", "Option 2"]
   */
  convertOptionsStringToArray(text: string): string[] {
    return text
      .split(/\r?\n/)
      .filter((line) => line.trim().startsWith("-"))
      .map((line) => line.replace(/^-\s?/, "").trim());
  }

  private handleError(error: any): Observable<never> {
    console.error("API Error:", error);
    let errorMessage = "An error occurred";

    if (error.status === 401) {
      errorMessage = "Unauthorized. Please check your API key.";
    } else if (error.status === 404) {
      errorMessage = "Survey not found.";
    } else if (error.error?.message) {
      errorMessage = error.error.message;
    }

    return throwError(() => new Error(errorMessage));
  }
}

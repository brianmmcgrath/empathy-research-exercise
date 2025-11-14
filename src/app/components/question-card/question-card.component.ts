import { Component, Input, Output, EventEmitter, ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Question } from '../../models/question.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleCheck, faListCheck, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-question-card',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.scss']
})
export class QuestionCardComponent implements OnInit {
  constructor(private cdr: ChangeDetectorRef) {}

  @Input() question!: Question;
  @Input() questionNumber!: number;
  @Output() questionChange = new EventEmitter<Question>();
  @Output() delete = new EventEmitter<void>();

  questionScript = '';
  questionText = '';
  question01 = '';
  options01: string[] = [];

  showTypeDropdown = false;

  faCircleCheck = faCircleCheck;
  faListCheck = faListCheck;
  faTrash = faTrash;
  optionsString: string = '';

  ngOnInit() {
    if (this.question && this.question.questionText.length > 0) {
      this.questionText = this.question.questionText;
      this.optionsString = this.convertOptionsListToString(this.question.options);
      this.questionScript = `${this.questionText}\n${this.optionsString}`;
    }
    this.cdr.detectChanges();
  }

  updateQuestion(field: keyof Question, value: any): void {
    this.question = { ...this.question, [field]: value };
    this.questionChange.emit(this.question);
  }

  deleteQuestion(): void {
    this.delete.emit();
  }

  selectOptionsType(type: number): void {
    this.updateQuestion('questionType', type);
    this.showTypeDropdown = false;
  }

  toggleRequired(): void {
    this.updateQuestion('mandatoryInd', !this.question.mandatoryInd);
  }

  toggleRandomize(): void {
    this.updateQuestion('randomizeOptionsInd', !this.question.randomizeOptionsInd);
  }

  changeOptionsString(): void {
    const updatedOptions = this.convertOptionsStringToArray(this.optionsString);
    this.updateQuestion('options', updatedOptions);
  }

  convertOptionsListToString(options: string[]): string {
    return options.map(option => `- ${option}`).join('\n');
  }

  convertOptionsStringToArray(text: string): string[] {
    return text
      .split(/\r?\n/)
      .filter((line) => line.trim().startsWith("-"))
      .map((line) => line.replace(/^-\s?/, "").trim());
  }

  parseQuestionScript() {
    const lines = this.questionScript.split('\n').map(l => l.trim());

    // Find the first line ending with '?'
    const questionIndex = lines.findIndex(l => l.endsWith('?'));

    if (questionIndex !== -1) {
      this.question01 = lines[questionIndex];

      // Parse following lines that begin with "- "
      this.options01 = lines
        .slice(questionIndex + 1)
        .filter(line => line.startsWith('- '))
        .map(line => line.substring(2)); // remove "- "
    } else {
      this.question01 = '';
      this.options01 = [];
    }
    this.question.questionText = this.question01;
    this.question.options = this.options01;
    this.questionChange.emit(this.question);
  }

}



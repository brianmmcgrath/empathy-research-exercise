export interface Question {
  questionId: number;
  number?: string;
  questionType: number; // 0 = Single Choice, 1 = Multi Choice
  questionText: string;
  options: string[];
  optionsString?: string;
  mandatoryInd: boolean;
  randomizeOptionsInd: boolean;
}

export interface Survey {
  id?: string;
  title: string;
  description: string;
  questions: Question[];
  createdAt?: Date;
  updatedAt?: Date;
}

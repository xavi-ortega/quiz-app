export interface Quiz {
  id: number;
  title: string;
  mark?: number;
  body?: string;
  questions?: QuizQuestion[];
}

export interface QuizResults {
  answers: QuizAnswer[];
}

interface QuizQuestion {
  id: number;
  label: string;
  items: QuizQuestionItem[];
}

interface QuizQuestionItem {
  id: number;
  label: string;
  value: number;
}

interface QuizAnswer {
  id: number;
  value: number | number[];
}

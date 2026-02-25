export interface Question {
  question: string,
  answer: string
}


export const newQuestion = (question: string, answer: string): Question => {
  return {
    question,
    answer
  }
}


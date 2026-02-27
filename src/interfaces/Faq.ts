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

// Словарь
// Ключ - название языка
// Значение - функция, которая принимает className и возвращает код относительно className
export type LangConfig = { [key: string]: (arg0: string) => string }

export type LangGenerator = {
  css?: (className: string) => string,
  js?: (className: string) => string,
  html?: (className: string, questions: Question[]) => string,
  php?: (className: string) => string
}

export interface FaqComponentProps {
  questions?: Question[],
  onInit: (
    arg0: LangGenerator,
  ) => void
}


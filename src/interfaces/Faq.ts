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

export const HeaderTags = ["h1", "h2", "h3", "h4", "h5", "h6", "div", "p"] as const
export type HeaderTag = (typeof HeaderTags)[keyof typeof HeaderTags]

export type LangGenerator = {
  css?: (className: string) => string,
  js?: (className: string) => string,
  html?: (className: string, header: string, headerTag: string, questions: Question[]) => string,
  php?: (className: string) => string
}

export interface FaqComponentProps {
  header?: string,
  tag?: HeaderTag,
  questions?: Question[],
  onInit: (
    arg0: LangGenerator,
  ) => void
}


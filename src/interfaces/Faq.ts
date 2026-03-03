export type Question = {
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
  title?: string,
  lang: string,
  generator: (arg0: FaqSettings, arg1: Question[]) => string,
}

export type FaqSettings = {
  className: string;
  faqHeader: string;
  headerTag: HeaderTag;
  isWrap: boolean;
  wrapperClass: string;
};


export interface FaqComponentProps {
  header?: string,
  tag?: HeaderTag,
  questions?: Question[],
  onInit: (
    arg0: LangGenerator[],
  ) => void
}


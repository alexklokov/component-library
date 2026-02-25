import type { Component } from "svelte"

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


export interface FaqComponentProps {
  questions?: Question[],
  onEdit: (arg0: Component) => void
}


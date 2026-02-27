import { type Question } from '../../../interfaces/Faq'

export const html = (className: string, header: string, headerTag: string, questions: Question[]): string => {

  let result = `<div class="${className}-items" itemscope itemtype="https://schema.org/FAQPage">
  <${headerTag} class="${className}__header">${header}</${headerTag}>`

  const items = questions.map(question => {
    return `
  <div class="${className}" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
    <div class="${className}__title" itemprop="name">
      ${question.question}
    </div>
    <div class="${className}__answer" itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
      <div class="${className}__text" itemprop="text">
        ${question.answer}
      </div>
    </div>
  </div>`
  })

  result += items.join("") + "\n</div>"

  return result
}

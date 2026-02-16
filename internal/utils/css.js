const objectToCss = obj => {
  return Object.entries(obj).map(([selector, styles]) => {

    const linesStyleCode = Object.entries(styles)
    .map(([styleKey, styleValue]) => {
      return `\t${styleKey}: ${styleValue};`
    })
    .join('\n')

    return `${selector} {
${linesStyleCode}
}`
  }).join('\n\n')
}

export {
  objectToCss
}

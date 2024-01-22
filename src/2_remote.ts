function getQuestionPart(phrases: string[]): string[] {
  const [[...one], [...two], [...three]] = phrases

  const charIndex1 = []
  one.forEach((char, index) => {
    if (two.includes(char) && three.includes(char)) {
      charIndex1.push([index, char])
    }
  })

  const wordsArr = ['']
  var currentWord = 0
  var currentIndex = null
  charIndex1.forEach((val: [number, string]) => {
    const [index, char] = val
    if (currentIndex && currentIndex !== index - 1) {
      wordsArr.push(char)
      currentWord++
    } else {
      wordsArr[currentWord] += char
    }
    currentIndex = index
  })

  const charIndex2 = []
  two.forEach((char, index) => {
    if (one.includes(char) && three.includes(char)) {
      charIndex2.push([index, char])
    }
  })
  currentWord = wordsArr.length
  wordsArr.push('')
  charIndex2.forEach((val: [number, string]) => {
    const [index, char] = val
    if (currentIndex && currentIndex !== index - 1) {
      wordsArr.push(char)
      currentWord++
    } else {
      wordsArr[currentWord] += char
    }
    currentIndex = index
  })

  const charIndex3 = []
  three.forEach((char, index) => {
    if (one.includes(char) && two.includes(char)) {
      charIndex3.push([index, char])
    }
  })
  currentWord = wordsArr.length
  wordsArr.push('')
  charIndex3.forEach((val: [number, string]) => {
    const [index, char] = val
    if (currentIndex && currentIndex !== index - 1) {
      wordsArr.push(char)
      currentWord++
    } else {
      wordsArr[currentWord] += char
    }
    currentIndex = index
  })

  var removeWord = ''
  const wordCounts = {}
  const duplicates = []

  for (const word of wordsArr.filter((val) => val)) {
    wordCounts[word] = (wordCounts[word] || 0) + 1
    if (wordCounts[word] > 1) {
      duplicates.push(word)
    }
  }
  if (duplicates) removeWord = duplicates[0]

  const answer = phrases.map((val) =>
    val.replace(removeWord, '').replace(/\s/g, '')
  )
  return answer
}

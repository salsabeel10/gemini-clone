import { createContext, useState } from 'react'
import run from '../Config/gemni'

export const Context = createContext()

const ContextProvider = (props) => {
  const [input, setInput] = useState('')
  const [recentPrompt, setRecentPrompt] = useState('')
  const [prevPrompts, setPrevPrompts] = useState([])
  const [showResult, setShowResult] = useState(false)
  const [loading, setLoading] = useState(false)
  const [resultData, setResultData] = useState('')

  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord)
    }, 75 * index)
  }

  const formatData = (data) => {
    let responseArray = data.split('**')
    let newResponse = ''
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newResponse += responseArray[i]
      } else {
        newResponse += '<b>' + responseArray[i] + '</b>'
      }
    }
    return newResponse.split('*').join('<br>')
  }

  const onSent = async (prompt) => {
    setResultData('')
    setLoading(true)
    setShowResult(true)
    setRecentPrompt(input)
    const response = await run(input)
    const formattedResponse = formatData(response)
    const newResponseArray = formattedResponse.split(' ')
    for (let i = 0; i < newResponseArray.length; i++) {
      const nextWord = newResponseArray[i]
      delayPara(i, nextWord + ' ')
    }
    setLoading(false)
    setInput('')
  }

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
  }

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  )
}

export default ContextProvider

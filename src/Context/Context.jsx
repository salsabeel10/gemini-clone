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

  const delayPara =(index,nextWord)=>{
    setTimeout(()=>{
      setResultData(prev=>prev+nextWord);
    },75*index)

  }

  const newChat =() => {
    setLoading(false)
    setShowResult(false)
  }

  const onSent = async (prompt) => {
    setResultData('')
    setLoading(true)
    setShowResult(true)
    let response

    if (prompt !== undefined) {
      response = await run(prompt)
      setRecentPrompt(prompt)
    } else {
      setPrevPrompts((prev) => [...prev, input])
      setRecentPrompt(input)
      response = await run(input)
    }

    // Step 1: Bold formatting for text enclosed in "**"
    let responseArray = response.split('**')
    let newResponse = ''
    for (let i = 0; i < responseArray.length; i++) {
      if (i == 0 || i % 2 !== 1) {
        newResponse += responseArray[i]
      } else {
        newResponse += '<b>' + responseArray[i] + '</b>'
      }
    }
    // Step 2: Replace single "*" with bullet points
    let formattedResponse = newResponse.split('*').join('<br>&bull; ')

    // Step 3: Add line breaks for better readability (can be customized further)
    formattedResponse = formattedResponse.replace(/<\/b><br>/g, '</b><br><br>')

    // Step 4: Split into words and render with delay (or just set innerHTML for immediate display)
    let newResponseArray = formattedResponse.split(' ')
    for (let i = 0; i < newResponseArray.length; i++) {
      const nextWord = newResponseArray[i]
      delayPara(i, nextWord + ' ') // Assuming delayPara handles the delayed rendering
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
    newChat
  }
  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  )
}

export default ContextProvider

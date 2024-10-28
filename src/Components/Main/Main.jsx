import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../Context/Context'
import Cards from './Cards'

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context)

  const handleRefresh=()=>{
    window.location.reload()
  }

  const comingSoon=()=>{
    window.alert("Coming Soon..")
  }

  return (
    <div className="main">
      <div className="nav">
        <p onClick={handleRefresh} className="cursor-pointer">
          Gemini
        </p>
        <img
          onClick={handleRefresh}
          className="cursor-pointer"
          src={assets.user_icon}
          alt="user-icon"
        />
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet mt-7">
              <p>
                <span>Hello, Salsabeel</span>
              </p>
              <p>How can I help you today?</p>
            </div>
            <Cards />
          </>
        ) : (
          <div className="result mb-8">
            <div className="result-title">
              <img src={assets.user_icon} alt="user-icon" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="gemini-icon" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter a prompt here"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  onSent()
                }
              }}
            />
            <div>
              <img onClick={comingSoon} src={assets.gallery_icon} alt="gallery-icon" />
              <img onClick={comingSoon} src={assets.mic_icon} alt="mic-icon" />
              {input ? (
                <img
                  onClick={() => onSent()}
                  src={assets.send_icon}
                  alt="send-icon"
                />
              ) : null}
            </div>
          </div>
          <p className="bottom-info sm:pb-0">
            Gemini may display inaccurate info, including about people, so
            double-check its responses. Your privacy and Gemini Apps.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Main

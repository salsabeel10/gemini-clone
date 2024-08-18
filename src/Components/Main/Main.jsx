import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../Context/Context'

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

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="user-icon" />
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, Salsabeel</span>
              </p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              <div className="card">
                <p>
                  What information about your upcoming trip are you seeking?
                </p>
                <img src={assets.compass_icon} alt="compass-icon" />
              </div>

              <div className="card">
                <p>
                  Need to write an email, a social media post, or a
                  presentation?
                </p>
                <img src={assets.message_icon} alt="message-icon" />
              </div>

              <div className="card">
                <p>
                  Do you want to express yourself creatively but lack
                  inspiration?
                </p>
                <img src={assets.bulb_icon} alt="bulb-icon" />
              </div>

              <div className="card">
                <p>
                  How can I support you in learning more about programming
                  languages?
                </p>
                <img src={assets.code_icon} alt="code-icon" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
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
              onKeyDown={(e)=>{
                if(e.key === 'Enter'){
                  onSent()
                }
              }}
            />
            <div>
              <img src={assets.gallery_icon} alt="gallery-icon" />
              <img src={assets.mic_icon} alt="mic-icon" />
              {input?<img
                onClick={() => onSent()}
                src={assets.send_icon}
                alt="send-icon"
              />:null}
              
            </div>
          </div>
          <p className="bottom-info">
            Gemini may display inaccurate info, including about people, so
            double-check its responses. Your privacy and Gemini Apps
          </p>
        </div>
      </div>
    </div>
  )
}

export default Main

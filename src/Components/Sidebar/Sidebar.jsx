import React, { useContext, useState } from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { Context } from '../../Context/Context'
import { toast } from 'react-toastify'


const Sidebar = () => {
  const [extended, setExtended] = useState(false)
  const {onSent,prevPrompts,setRecentPrompt,newChat} = useContext(Context);
  const uniquePrompts = Array.from(new Set(prevPrompts))
  const comingSoon = () => toast.info('Coming Soon !')

  // console.log(prevPrompts);
  const loadPrompt = async(prompt)=>{
    setRecentPrompt(prompt)
    await onSent(prompt)
  }

  return (
    <div className="sidebar">
      <div className="top">
        <img
          onClick={() => setExtended(!extended)}
          className="menu"
          src={assets.menu_icon}
          alt="menu"
        />
        <div onClick={() =>newChat()} className="new-chat">
          <img src={assets.plus_icon} alt="plus-icon" />
          {extended ? <p>New Chat</p> : null}
        </div>
        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {uniquePrompts.map((item,index)=>{
                return (
                  <div key={index} onClick={()=>loadPrompt(item)} className="recent-entry">
                    <img src={assets.message_icon} alt="msg-icon" />
                    <p>{item.slice(0,18)} ...</p>
                  </div>
                )
            })}
            
          </div>
        ) : null}
      </div>

      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img onClick={comingSoon} src={assets.question_icon} alt="question" />
          {extended ? <p>Help</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img onClick={comingSoon} src={assets.history_icon} alt="history" />
          {extended ? <p>Activity</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img onClick={comingSoon} src={assets.setting_icon} alt="setting" />
          {extended ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  )
}

export default Sidebar

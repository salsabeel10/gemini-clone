import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import './Main.css'

const Cards = () => {
    const [cardInput, setCardInput] = useState(null)
    const handleClick=(t)=>{
        setCardInput(t)
        console.log(cardInput)
    }
    
     const icons = [
       { src: assets.compass_icon, alt: 'compass-icon' },
       { src: assets.message_icon, alt: 'message-icon' },
       { src: assets.bulb_icon, alt: 'bulb-icon' },
       { src: assets.code_icon, alt: 'code-icon' },
     ]
  return (
    <div className="cards">
      {assets.cardTexts.map((text, index) => (
        <div className="card" key={index} onClick={()=>handleClick(text)}>
          <p>{text}</p>
          <img src={icons[index].src} alt={icons[index].alt} />
        </div>
      ))}
    </div>
  )
}

export default Cards
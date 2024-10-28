import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { Context } from '../../Context/Context'
import './Main.css'

const Cards = () => {
    const {setInput} =useContext(Context)
    const [cardInput, setCardInput] = useState(null)
    const handleClick=(t)=>{
        setInput(t)
        console.log(cardInput)
    }
    
     const icons = [
       { src: assets.compass_icon, alt: 'compass-icon' },
       { src: assets.message_icon, alt: 'message-icon' },
       { src: assets.bulb_icon, alt: 'bulb-icon' },
       { src: assets.code_icon, alt: 'code-icon' },
     ]
  return (
    <div className="cards pt-1 mb-10">
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
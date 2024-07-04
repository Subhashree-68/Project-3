import React from 'react'
import "./KeyPad.css"
const KeyPad = (props) => {
  const keys = [
    {
      keyCode: 55,
      lable: "7",
    },
    {
      keyCode: 56,
      lable: "8",
    },
    {
      keyCode: 57,
      lable: "9",
    },
    {
      keyCode: 52,
      lable: "4",
    },
    {
      keyCode: 53,
      lable: "5",
    },
    {
      keyCode: 54,
      lable: "6",
    },
    {
      keyCode: 49,
      lable: "1",
    },
    {
      keyCode: 50,
      lable: "2",
    },
    {
      keyCode: 51,
      lable: "3",
    },
    {
      keyCode: 48,
      lable: "0",
    },
    {
      keyCode: 190,
      lable: ".",
    },
    {
      keyCode: 13,
      lable: "=",
    },
  ]

  const symbols = [
    {
      lable: "⌫",
      keyCode: 8,
      value: "backspace",
    },
    {
      lable: "÷",
      keyCode: 111,
      value: "/",
    },
    {
      lable: "×",
      keyCode: 56,
      value: "*",
    },
    {
      lable: "−",
      keyCode: 109,
      value: "-",
    },
    {
      lable: "+",
      keyCode: 107,
      value: "+",
    },
  ]

  return (
    <div className="keypad">
      <div className='keypad_keys'>
        {
          keys.map((item, index) => (<p onClick={()=>props.handleKeyPress(item.keyCode,item.lable)} key={index}>{item.lable}</p>))
        }
      </div>
      <div className="keypad_symbols">
        {
          symbols.map((item, index) =>( <p onClick={()=>props.handleKeyPress(item.keyCode,item.value)} key={index}>{item.lable}</p>))
        }
      </div>
    </div>
  )
}

export default KeyPad

import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at
const initialValues = { x: 2, y: 2, steps: 0, email: "" }
const test = [
  [1,2,4,5,7,8],
  [0,1,3,4,6,7],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,1,2],
  [3,4,5],
  [6,7,8],
]

export default function AppFunctional(props) {
 const [coord, setCoord] = useState({x: 2, y: 2})
 const [values, setValues] = useState(initialValues)
 const [steps, setSteps] = useState(initialSteps)
 const [index, setIndex] = useState(initialIndex)
 const [message, setMessage] = useState(initialMessage)
 const [email, setEmail] = useState('')

 useEffect(() =>{
  setCoord(
    {x:test[2].includes(index) ? 1: test[3].includes(index) ? 2 :3,
      y:test[5].includes(index) ? 1: test[6].includes(index) ? 2:3
    })
    setValues({...values, x: coord.x, y: coord.y, steps: steps, })
 }, [index])

 useEffect(() =>{
  
    setValues({...values, x: coord.x, y: coord.y, steps: steps, })
 }, [coord])

 useEffect(() =>{
  
  setValues({ x: coord.x, y: coord.y, steps: steps, email: email })
}, [email])

  const handleDirection = e => {
  const {id} = e.target
  
  
  if(id == 'left'){
    let click = test[0].includes(index) 
    ? function() {setIndex(index - 1); setSteps(steps +1); setMessage(initialMessage);}
    : function() {setMessage("You can't go left")}
    click()
  }
if(id == 'right'){
  let click = test[1].includes(index) 
    ? function() {setIndex(index + 1); setSteps(steps +1); setMessage(initialMessage)}
    : function() {setMessage("You can't go right")}
    click()
}
if(id == 'up'){
  let click = index - 3 >=0 
  ? function() {setIndex(index - 3); setSteps(steps +1); setMessage(initialMessage)}
  : function() {setMessage("You can't go up")}
  click()
}
  if(id == 'down'){
    let click = index + 3 <=8 
  ? function() {setIndex(index + 3); setSteps(steps +1); setMessage(initialMessage)}
  : function() {setMessage("You can't go down")}
  click()
  }

   

 }

  const reset = () => {
      setCoord({x: 2, y: 2})
      setValues(initialValues)
      setSteps(initialSteps)
      setIndex(initialIndex)
      setMessage(initialMessage)
      setEmail('')
  }

  const handleChanges = e => {
    const {value} = e.target
    setEmail(value)
  }

  const handleSubmit = e => {
    e.preventDefault()

    axios.post('http://localhost:9000/api/result', values)
    .then( res => {
      console.log(res); setEmail('') ;setMessage(res.data.message)
    })
    .catch( err => {
      console.log(err.response.data.message);
        setMessage(err.response.data.message)
    })

  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates ({coord.x}, {coord.y})</h3>
        <h3 id="steps">You moved {steps} {steps === 1 ? 'time': 'times'}</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === index ? ' active' : ''}`}>
              {idx === index ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button onClick={handleDirection} id="left">LEFT</button>
        <button onClick={handleDirection} id="up">UP</button>
        <button onClick={handleDirection} id="right">RIGHT</button>
        <button onClick={handleDirection} id="down">DOWN</button>
        <button onClick={reset} id="reset">reset</button>
      </div>
      <form onSubmit={handleSubmit}>
        <input onChange={handleChanges} value={email} id="email" type="email" placeholder="type email"></input>
        <input  id="submit" type="submit"></input>
      </form>
    </div>
  )
}

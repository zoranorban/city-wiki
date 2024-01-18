import { useState } from "react"
import Button from "./Button/Button"

const Counter = () => {
  const [numberField, setNumberField] = useState(0)
    
  const handlePlusButton = () => {
    setNumberField(numberField + 1)
  }

  const handleMinusButton = () => {
    setNumberField(numberField - 1)
  }

  return <div>
    <p>{numberField}</p>
    <Button onClick={handlePlusButton}>+</Button>
    <Button onClick={handleMinusButton}>-</Button>
  </div>
}

export default Counter;
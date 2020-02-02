import { h, createRef } from 'preact'
import { useRef, useEffect, useState } from 'preact/hooks'
import './_counter.scss'
import { AVButton } from '../Button/AVButton'
  
  
export const AVCounter = (props: IProps) => {

  const inputRef = useRef<HTMLInputElement>()

  const [counter, setCounter] = useState(props.initValue)

  const _onChange = e => {
    const number_regex = /^[0-9]+$/;
    const currentVal = parseInt(inputRef.current.value)

    // Check IF: 
    // - input data is NOT a Number AND NOT Zero, OR 
    // - 'input' contains non-numerical value BUT NOT an empty string.
    if (isNaN(e.data) && e.data !== '0' || (!inputRef.current.value.match(number_regex) && inputRef.current.value !== '')) 
      inputRef.current.value = counter.toString()
      
    // Check IF 'input' value:
    // - is LESS than minimum value, OR
    // - is empty
    else if (currentVal < props.minValue || !currentVal) 
      inputRef.current.value =  props.minValue.toString()
      
    // check IF 'input' value is GREATER than maximum value.
    else if (currentVal > props.maxValue) 
      inputRef.current.value = props.maxValue.toString()

    setCounter(parseInt(inputRef.current.value))

    props.onValueChanged && props.onValueChanged({ e, value: inputRef.current.value })
  }

  const _onMinmaxClick = e => {
    if (e.do === 'min' && (counter - 1) < props.minValue ) 
      inputRef.current.value = props.minValue.toString()
    

    else if (e.do === 'add' && (counter + 1) > props.maxValue) 
      inputRef.current.value = props.maxValue.toString()

    else 
      inputRef.current.value = (counter + (e.do === 'add' ? 1 : -1)).toString()

    setCounter(counter + (e.do === 'add' ? 1 : -1))

    props.onValueChanged && props.onValueChanged({ e: null, value: inputRef.current.value })
  }

  const cssClass = `
    av-counter
    ${props.className}
    ${props.size || 'default'}
  `

  
  return (
    <div class={cssClass}>
      <div class="area-minbtn">
        <AVButton 
          size="conform" 
          btnStyle="tertiary" 
          onClick={e => _onMinmaxClick({ e, do: 'min' })}
          >
          -
        </AVButton>
      </div>
      <div class="area-input">
        <input
          ref={inputRef}
          name="counter"
          value={counter}
          onPaste={_onChange}
          onChange={_onChange}
          />
      </div>
      <div class="area-maxbtn">
        <AVButton 
          size="conform" 
          btnStyle="tertiary" 
          onClick={e => _onMinmaxClick({ e, do: 'add' })}>
          +
        </AVButton>
      </div>
    </div>
  )
}

interface IProps {
  className?: string
  minValue: number
  maxValue: number
  initValue: number
  size?: 'default' | 'small'

  onValueChanged?: any
}
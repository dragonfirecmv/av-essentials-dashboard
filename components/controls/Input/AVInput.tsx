import { h } from 'preact'
import { useState, useEffect } from 'preact/hooks'
import './_input.scss'


export const AVInput = (props: IProps) => {

  const [textValue, setTextValue] = useState('')
  const [focused, setFocused] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    setError(!!props.errorLabel)
  }, [props.errorLabel])

  useEffect(() => {
    setTextValue(props.value)
  }, [props.value])

  useEffect(() => {
    if (props.forceEmpty) setTextValue('')
    if (!props.forceEmpty) setTextValue(props.value)
  }, [props.forceEmpty])


  const _onChange = e => {
    const value = e.target.value;
    setTextValue(value)
    if (error) setError(false)
    props.onChange && props.onChange(e)
  }


  const cssClass = `\
    av-input \
    ${props.className || ''} \
    size-${props.inputSize || 'default'} \
    label-${
      !props.locked 
      && props.inputLabel 
      && props.inputSize === 'large' 
      && (focused || textValue) 
        ? 'on' 
        : 'off'} \
    ${props.locked 
      ? 'locked' 
      : focused
        ? 'focused'
        : ''}\
    ${error ? 'error' : ''}
    `.replace(/\s+/g,' ').trim();

  return (
    <div class={cssClass} data-theme={props.inputTheme || 'light'}>
      <div class="input-label">{props.inputLabel}</div>
      <div class="input-enclosing">
        <input
          id={props.id}
          type={props.type && props.type || 'text'}
          value={textValue}
          placeholder={props.inputPlaceholder}
          onChange={_onChange}
          onFocus={() => !props.locked && setFocused(true)}
          onBlur={() => !props.locked && setFocused(false)}
        />
      </div>
      <div class="input-info">{props.errorLabel}{!!props.inputLabel && '&nbsp;'}</div>

    </div>
  )
}


interface IProps {
  id: string
  value?: string
  children?: any
  className?: string
  isLoading?: boolean

  inputSize?: 'small' | 'default' | 'large' 
  inputTheme?: 'light' | 'dark'
  inputType?: 'text' | 'email' | 'search' | 'tel' | 'number' | 'url' | "password"
  inputLabel?: string
  inputPlaceholder?: string

  locked?: boolean
  errorLabel?: string
  forceEmpty?: boolean

  onChange?: any
  [key: string]: any
}
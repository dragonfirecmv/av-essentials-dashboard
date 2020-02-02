import { h } from 'preact'
import { Range } from 'react-range';
import { useState, useCallback } from 'preact/hooks'
import './_slider.scss'


export const AVSlider = (props: IProps) => {

  const [value, setValue] = useState([props.value] || [props.min] || [0])

  const _onChange = (val: number[]) => {
    setValue(val)
    props.onChange && props.onChange(val[0])
  }

  return (
    <div class="av-slider">
      <Range
        step={props.step || 1}
        min={props.min || 0}
        max={props.max || 100}
        values={[props.value]}
        onChange={_onChange}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            class="av-slider-track"
            style={props.style && props.style}
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            class="av-slider-thumb"
            style={props.style && props.style}
          />
        )}
      />
    </div>
  )
}

interface IProps {
  value?: number
  min?: number
  max?: number
  step?: number

  onChange?(value: number): any
}
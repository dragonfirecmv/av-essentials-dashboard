import { h, Fragment as F } from 'preact'
import './_spinner.scss'


export const AVSpinner = (props: IProps) => {

  const cssVar = {
    "--background-color": props.backgroundColor || "rgba(255, 255, 255, 0.2)",
    "--prominent-color": props.prominentColor || 'white',
    "--thickness": props.thickness || "4px",
    "--width": props.width || '100%',
    "--height": props.height || '100%'
  }

  return (
    <div class="av-spinner" style={cssVar}>
      <div class="loader" />
    </div>
  )
}
  
interface IProps {
  backgroundColor?: string
  prominentColor?: string
  thickness?: string
  width?: string
  height?: string
}
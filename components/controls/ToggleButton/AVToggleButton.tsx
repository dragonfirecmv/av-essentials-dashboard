import { h } from 'preact'
import './_toggleButton.scss'


export const AVToggleButton = (props: IProps) => {

  const cssClass = `
    av-toggle-button
    ${props.checked && 'active' || ''}
  `.replace(/\s+/g,' ').trim();

  const _onClick = e => {
    props.onClick && props.onClick()
  }

  return (
    <div className={cssClass} onClick={_onClick} data-theme="light">
      {props.children}
    </div>
  )
}

interface IProps {
  checked?: boolean

  onClick?: any
  [key: string]: any
}
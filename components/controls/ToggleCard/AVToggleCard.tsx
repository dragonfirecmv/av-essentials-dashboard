import { h } from 'preact'
import { useState } from 'preact/hooks'
import './_toggleCard.scss'


export const AVToggleCard = (props: IProps) => {

  const [active, setActive] = useState(props.checked || false)

  const cssClass = `
    av-toggle-card
    ${active && 'active' || ''}
  `.replace(/\s+/g,' ').trim();

  const _onClick = e => {
    props.onClick && props.onClick({ e, active: !active })
    setActive(!active)
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
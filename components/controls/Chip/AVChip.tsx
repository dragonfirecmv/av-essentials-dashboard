// #region Imports, interfaces
import { h } from 'preact'
import './_chip.scss'

interface IProps {
  chipStyle?: 'default' | 'wireframe'
  text?: string

  onClick?: any
}
// #endregion


export const AVChip = (props: IProps) => {

  const cssName = `\
    av-chip\
    ${props.chipStyle === 'wireframe' && 'style-wireframe' || 'style-default'}\
    ${props.onClick && 'clickable' || ''}\
  `.replace(/\s+/g,' ').trim();

  return (
    <div className={cssName}>
      <div className="tx chip-text">{props.text}</div>
    </div>
  )
}
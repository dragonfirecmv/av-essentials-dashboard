//#region Imports
import { h } from 'preact'
import { useState, useEffect } from 'preact/hooks'
import './_accordion.scss'
//#endregion


export const AVAccordion = (props: IProps) => {

  const [collapsed, setCollapsed] = useState(props.defaultCollapsed || false)

  return (
    <div className="av-accordion">
      <div className="accordion-header" onClick={() => setCollapsed(!collapsed)}>
        <div className="tx accordion-title">{props.mainTitle}</div>
      </div>
      <div className="accordion-child" style={{ display: collapsed ? 'none' : '', }}>
        {props.children}
      </div>
    </div>
  )
}

interface IProps {
  children?: any
  defaultCollapsed?: boolean
  mainTitle?: string


  [key: string]: any
}
import { h, Fragment as F } from 'preact'
import './_container.scss'


export const AVContainer = (props: IProps) => (
  <div class={`av-container ${props.className}`}>
    <div class={`enclosure-content ${props.sizingType}`}>
      { props.children }
    </div>
  </div>
)

interface IProps {
  className?: string
  children?: any
  sizingType?: 'default' | 'bootstrap' | 'TKPDA' | 'nopadding'
  // showOn?: 'desktop-only' | 'mobile-only' | 'agnostic'
}
import { h, Fragment as F } from 'preact'
import './_link.scss'


export const AVLink = ({ link, color, className, disabled, ...rest }: IProps) => (
  <a class={`avlink-link ${color} ${disabled && 'disabled'} ${className}`}
     href={link}
     disabled={disabled}
     {...rest}/>
)

interface IProps {
  className?: string
  color?: 'default' | 'primary'
  link?: string
  disabled?: boolean
  [key: string]: any
}
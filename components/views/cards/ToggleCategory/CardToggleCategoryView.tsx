//#region Imports
import { h } from 'preact'
import { useState, useEffect } from 'preact/hooks'
import './_toggleCategory.scss'
import { CommonPlaceholderVendor } from '~/static/img'
import { ICategoryResponse } from '~/core/redux/gallery/categories'
import { IMedia } from '~/core/redux/gallery'
//#endregion


export const CardToggleCategoryView = (props: IProps) => {

  const [active, setActive] = useState(props.checked || false)

  useEffect(() => {
    if (active !== props.checked) setActive(props.checked)
  }, [props.checked])

  const cssClass = `
    view-card-toggle-category
    ${active && 'active' || ''}
  `.replace(/\s+/g, ' ').trim();

  const _onClick = e => {
    props.onClick && props.onClick({ e, active: !active, meta: props.meta })
    setActive(!active)
  }

  return (
    <div className={cssClass} onClick={_onClick} data-theme="light">
      <div className="section-image">
        <div className="image-enclosing">
          <img src={props.picture_url || CommonPlaceholderVendor}/>
        </div>
      </div>
      <div className="section-content">
        <div className="tx category-name">{props.category_name}</div>
      </div>
    </div>
  )
}

interface IProps {
  checked?: boolean
  meta?: ICategoryResponse
  category_name?: string
  picture_url?: string

  onClick?: any
  [key: string]: any
}
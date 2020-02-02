//#region Imports
import { h, Fragment as F } from 'preact'
import { useState, useEffect } from 'preact/hooks'
import { useDispatch, useSelector } from 'react-redux'
import './_editCategories.scss'
import { ICategoryResponse, GalleryCategoryActions } from '~/core/redux/gallery/categories'
import { IVendorCategory } from '~/core/redux/gallery/vendors'
import { IAppState } from '~/core/redux'
import { IGalleryState } from '~/core/redux/gallery'
import { AVChip, AVAccordion, AVToggleCard } from '~/components/controls'
import { CardToggleCategoryView } from '../../cards/ToggleCategory/CardToggleCategoryView'
import { containsObjectByKey } from '~/core/libs/tools/object-helper'
//#endregion


export const PanelEditCategoriesView = (props: IProps) => {

  const [categories, setCategories] = useState([] as ICategoryResponse[])
  const [categoryListing, setCategoryListing] = useState(null as ICategoryResponse[])

  const galleryState = useSelector<IAppState, IGalleryState>(state => state.gallery)
  const dispatch = useDispatch()


  useEffect(() => {
    const server_status = galleryState.categories.listing.meta.server_status

    if (server_status === 'idle')
      dispatch(GalleryCategoryActions.listAll_request())

    if (server_status === 'finished' && !props.loadingMode)
      setCategoryListing(galleryState.categories.listing.categories)

  }, [galleryState.categories.listing, props.loadingMode])

  useEffect(() => {
    if (!props.loadingMode) {
      if (props.multipleSelect) {
        if (props.selectedCategories)
          setCategories(props.selectedCategories)
        else
          setCategories([])
      }
      else {
        if (props.selectedCategory)
          setCategories([{ ...props.selectedCategory }])
        else
          setCategories([])
      }
    }

    else {
      setCategories(null)
      setCategoryListing(null)
    }


  }, [props.loadingMode, props.selectedCategories, props.selectedCategory])

  useEffect(() => {
    props.onCategoryChange &&
      props.onCategoryChange({ values: categories })
  }, [categories])


  const _onCategoryItemClick = e => {
    const tempCateg = [...categories]

    const alreadyContains = containsObjectByKey(tempCateg, e.meta, 'id')

    if (e.active && !alreadyContains)
      if (props.multipleSelect)
        setCategories([...tempCateg, e.meta])
      else
        setCategories([e.meta])

    else if (!e.active) {
      const filtered = tempCateg.filter(categ => categ.id !== e.meta.id)
      setCategories([...filtered])
    }
  }


  return (
    <div className="view-panel-edit-categories">

      <div className="area-selected">
        <div className="tx info-selected">Selected categor{props.multipleSelect && 'ies' || 'y'}:</div>
        <div className="selected-enclosing">
          {
            categories?.map(categorie => (<AVChip text={categorie?.name} />))
          }
        </div>
      </div>

      <div className="area-browse">
        <div className="browse-categories">
          {
            categoryListing?.map(categoryRoot => (
              <div className="enclosure-category-header">
                <AVAccordion mainTitle={categoryRoot?.name}>
                  <div className="enclosing-category">
                    {
                      categoryRoot?.children?.length < 1 && (
                        <div className="enclosure-categories">
                          <CardToggleCategoryView
                            onClick={_onCategoryItemClick}
                            checked={containsObjectByKey(categories, categoryRoot, 'id')}
                            category_name={categoryRoot?.name}
                            picture_url={categoryRoot?.media && categoryRoot?.media[0]?.url || ''}
                            meta={categoryRoot} />
                        </div>
                      )
                    }
                    {
                      categoryRoot?.children?.map(category => (
                        category?.children?.length < 1
                          ? (
                            <div className="enclosure-categories">
                              <CardToggleCategoryView
                                onClick={_onCategoryItemClick}
                                checked={containsObjectByKey(categories, category, 'id')}
                                category_name={category?.name}
                                picture_url={
                                  category?.media && category?.media[0]?.url
                                  || categoryRoot?.media && categoryRoot?.media[0]?.url
                                  || ''}
                                meta={category} />
                            </div>
                          )
                          : (
                            <F>
                              <div className="flex-break"></div>
                              <div className="enclosure-category-children">
                                <div className="enclosure-categories">
                                  <CardToggleCategoryView
                                    onClick={_onCategoryItemClick}
                                    checked={containsObjectByKey(categories, category, 'id')}
                                    category_name={category?.name}
                                    picture_url={
                                      category?.media && category?.media[0]?.url
                                      || categoryRoot?.media && categoryRoot?.media[0]?.url
                                      || ''}
                                    meta={category} />
                                </div>
                                <div className="enclosure-subcategories">
                                  {
                                    category?.children?.map(categoryChild => (
                                      <div className="enclosure-categories">
                                        <CardToggleCategoryView
                                          onClick={_onCategoryItemClick}
                                          checked={containsObjectByKey(categories, categoryChild, 'id')}
                                          category_name={categoryChild?.name}
                                          picture_url={
                                            categoryChild?.media && categoryChild?.media[0]?.url
                                            || category?.media && category?.media[0]?.url
                                            || categoryRoot?.media && categoryRoot?.media[0]?.url
                                            || ''}
                                          meta={categoryChild} />
                                      </div>
                                    ))
                                  }
                                </div>
                              </div>
                              <div className="flex-break"></div>
                            </F>
                          )
                      ))
                    }
                  </div>
                </AVAccordion>
              </div>
            ))
          }
        </div>
      </div>

    </div>
  )
}

interface IProps {
  loadingMode?: boolean
  multipleSelect?: boolean
  selectedCategories?: ICategoryResponse[]
  selectedCategory?: ICategoryResponse

  onCategoryChange?: any
  [key: string]: any
}
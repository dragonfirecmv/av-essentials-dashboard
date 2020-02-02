import { combineReducers } from 'redux';
import { galleryVendorReducer, galleryVendorInitState } from './vendors';
import { galleryCategoryReducer, galleryCategoryInitState } from './categories';
import { galleryPackageReducer, galleryPackageInitState } from './packages';
import { galleryGoodsReducer, galleryGoodsInitState } from './goods';
import { IGalleryState } from './types.gallery';


export const galleryInitState: IGalleryState = {
  categories: galleryCategoryInitState,
  vendors: galleryVendorInitState,
  packages: galleryPackageInitState,
  goods: galleryGoodsInitState
}

export const galleryRootReducer = combineReducers({
  categories: galleryCategoryReducer,
  vendors: galleryVendorReducer,
  packages: galleryPackageReducer,
  goods: galleryGoodsReducer
})
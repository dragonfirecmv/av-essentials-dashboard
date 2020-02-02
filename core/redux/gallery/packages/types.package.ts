import { IMedia, IStateBaseMetadata } from "../types.gallery";
import { ICategoryIdPayload, ICategoryResponse } from "../categories/types.category";
import { IVendorResponse } from "../vendors";
import { IGoodsResponse } from "../goods/types.goods";


// Interface :: Payloads and Response

export interface IPackageUpdatePayload {
  package_name: string;
  description: string;
  package_items: IPackageItemResponse[]
  price_total: string;
  min_order_details?: any;
  min_order_price?: any;
  metadata?: any;
  media: IMedia[];
  vendor_owner: IVendorResponse

}

export interface IPackagePayloadUpdate {
  id: string,
  update_payload: IPackageUpdatePayload
}

export interface IPackageUpdateCategoriesPayload {
  categories: ICategoryResponse[]
}

export interface IPackagePayloadUpdateCategories {
  id: string,
  update_categories: ICategoryResponse[]
}

export interface IPackageCreatePayload 
  extends IPackageUpdatePayload, 
          IPackageUpdateCategoriesPayload {}

export interface IPackageResponse 
  extends IPackageCreatePayload {
  id: string;
}


export interface IPackageItemPayload {
  quantity: number
  packaged_on: IPackageResponse
  selected_item: IGoodsResponse
}

export interface IPackageItemResponse
  extends IPackageItemPayload {
  id: string
}


// Interface :: States

export interface IPackageState {
  listing: IPackageStateListing
  selected: IPackageStateSelected
}

export interface IPackageStateListing {
  meta: IStateBaseMetadata
  packages?: IPackageResponse[]
}

export interface IPackageStateSelected {
  meta: IStateBaseMetadata
  package?: IPackageResponse
}
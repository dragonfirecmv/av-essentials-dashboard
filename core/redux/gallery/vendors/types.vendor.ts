import { IMedia, IOwnedByWho, IAdditionalInfo, IStateBaseMetadata } from '../types.gallery'
import { IPackageResponse } from '../packages/types.package'


// Interface :: Payloads

export interface IVendorGetFromSlugPayload {
  slug: string
}

export interface IVendorUpdatePayload {
  vendor_name: string;
  vendor_description?: string;
  vendor_addess?: string;
  vendor_email?: any;
  vendor_contacts?: string;
  additional_info?: IAdditionalInfo;
  vendor_localization_code?: string;
  vendor_currency_code?: string;
  packages_to_sell?: IPackageResponse[];
  goods_items?: any[];
  vendor_logo_url?: IMedia;
  media?: IMedia[];
}

export interface IVendorCategoryId {
  id: string;
}

export interface IVendorUpdateCategoriesPayload {
  vendor_categories: IVendorCategoryId[];
}

export interface IVendorPayloadUpdateBySlug {
  vendor_update: IVendorUpdatePayload
  slug: string
}

export interface IVendorPayloadUpdateCategory {
  vendor_slug: string
  payload_category: IVendorCategoryId[]
}

export interface IVendorCreatePayload
  extends IVendorUpdatePayload, IVendorUpdateCategoriesPayload { }


export interface IVendorCategory 
  extends IVendorCategoryId {
  name: string;
  media: IMedia[];
}

export interface IVendorCategoriesPayload {
  vendor_categories: IVendorCategory[];
}

export interface IVendorResponse 
  extends IVendorUpdatePayload, IVendorCategoriesPayload {
  id: string;
  slug: string;
  owned_by_who: IOwnedByWho;
}


// Interface :: States

export interface IVendorState {
  listing: IVendorStateListing
  selected: IVendorStateSelected
  edited: IVendorStateEdited
}

export interface IVendorStateEdited {
  meta: IStateBaseMetadata
  the_vendor?: IVendorResponse
}

export interface IVendorStateSelected {
  meta: IStateBaseMetadata
  vendor?: IVendorResponse
}

export interface IVendorStateListing {
  meta: IStateBaseMetadata
  vendors?: IVendorResponse[]
}
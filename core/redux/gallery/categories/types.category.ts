import { IMedia, IStateBaseMetadata } from "../types.gallery";


// Interface :: Data shapes

export interface ICategoryIdPayload {
  id: string
}

export interface ICategoryResponse 
  extends ICategoryIdPayload {
  name: string
  slug: string
  media?: IMedia[],
  children?: ICategoryResponse[] 
}


// Interface :: States

export interface ICategoryState {
  listing: ICategoryStateListing
  selected: ICategoryStateSelected
}

export interface ICategoryStateListing {
  meta: IStateBaseMetadata
  categories?: ICategoryResponse[]
}

export interface ICategoryStateSelected {
  meta: IStateBaseMetadata
  category?: ICategoryResponse
}
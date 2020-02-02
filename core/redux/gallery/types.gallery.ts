import { BaseServerStatus } from "~/core/libs/types/global-status.type";
import { ICategoryState } from "./categories/types.category";
import { IVendorState } from "./vendors";
import { IPackageState } from "./packages/types.package";
import { IGoodsState } from "./goods/types.goods";


export interface IMedia {
  url: string;
  description?: string;
  meta?: IMetadata;
}

export interface IMetadata {
  [key: string]: any
}

export interface IAdditionalInfo {
  IG: string;
  FB: string;
  YT: string;
}

export interface IOwnedByWho {
  user_id: string;
  givenname: string;
  email: string;
}

export interface IStateBaseMetadata {
  server_status: BaseServerStatus
  server_action: string
  server_message?: string
}


// Interface :: States

export interface IGalleryState {
  categories: ICategoryState
  vendors: IVendorState
  packages: IPackageState
  goods: IGoodsState
}
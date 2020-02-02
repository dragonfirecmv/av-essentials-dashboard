import { IToolsImageEditorState } from "./imageEditor";
import { IToolsVendorSelectorState } from "./vendorSelector";
import { IToolsPackageSelectorState } from "./packageSelector";
import { IToolsGoodsSelectorState } from "./goodsSelector";


export interface IToolsState {
  image_editor: IToolsImageEditorState
  vendor_selector: IToolsVendorSelectorState
  package_selector: IToolsPackageSelectorState
  goods_selector: IToolsGoodsSelectorState
}

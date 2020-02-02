

export interface IToolsImageEditorState {
  raw_data: any
  processed_data: any
  aspect_ratio: AspectRatio | number
}

export enum AspectRatio {
  Wide16by9 = (16 / 9),
  Wide16by10 = (16 / 10),
  Square1by1 = (1 / 1)
}
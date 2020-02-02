import { h } from 'preact'


interface IProps {
  id: string
  fill?: string
}

export const IconSave = ({ id, fill }: IProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <defs>
      <style>{`.path-fill{fill:${fill || "#231f20"};}`}</style>
    </defs>
    <title>Save</title>
    <g id="Layer_2" data-name="Layer 2">
      <g id="Layer_20" data-name="Layer 20">
        <path d="M0 0h24v24H0z" fill="none" />
        <path class="path-fill" d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z" />
      </g>
    </g>
  </svg>
)
import { h } from 'preact'


interface IProps {
  id: string
  fill?: string
}

export const SvgDropdownArrow = ({ id, fill }: IProps) => (
  <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
    width="255px" height="255px" viewBox="0 0 255 255" style="enable-background:new 0 0 255 255;" >
    <defs>
      <style>{`.path-fill{fill:${fill || "#231f20"};}`}</style>
    </defs>
    <g>
      <g id="arrow-drop-down">
        <polygon class="path-fill" points="0,63.75 127.5,191.25 255,63.75 		" />
      </g>
    </g>
  </svg>
)
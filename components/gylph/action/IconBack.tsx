import { h } from 'preact'


interface IProps {
  id: string
  fill?: string
}

export const IconBack = ({ id, fill }: IProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
    <defs>
      <style>{`.path-fill{fill:${fill || "#231f20"};}`}</style>
    </defs>
    <title>{id}</title>
    <g id={id} data-name="Layer 2">
      <g id="back">
        <path class="path-fill" d="M16,7H3.83L9.42,1.41,8,0,0,8l8,8,1.41-1.41L3.83,9H16Z" />
      </g>
    </g>
  </svg>
)
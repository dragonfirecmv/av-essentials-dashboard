import { h } from 'preact'


interface IProps {
  id: string
  fill?: string
}

export const IconDelete = ({ id, fill }: IProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 36">
    <defs>
      <style>{`.path-fill{fill:${fill || "#231f20"};}`}</style>
    </defs>
    <title>Delete</title>
    <g id="Layer_2" data-name="Layer 2">
      <g id="Layer_20" data-name="Layer 20">
        <path class="path-fill" d="M2,32a4,4,0,0,0,4,4H22a4,4,0,0,0,4-4V8H2ZM6,12H22V32H6ZM21,2,19,0H9L7,2H0V6H28V2Z" />
      </g>
    </g>
  </svg>
)
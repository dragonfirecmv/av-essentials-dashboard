import { h } from 'preact'


interface IProps {
  id: string
  fill?: string
}

export const IconEdit = ({ id, fill }: Props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
    <defs>
      <style>{`.path-fill{fill:${fill || "#231f20"};}`}</style>
    </defs>
    <title>Edit Icon</title>
    <g id="Layer_2" data-name="Layer 2">
      <g id="Layer_12" data-name="Layer 12">
        <path class="path-fill" d="M0,28v8H8L30,14,22,6ZM35.35,8.66a2.2,2.2,0,0,0,0-3.13L30.47.65a2.2,2.2,0,0,0-3.13,0L24,4l8,8Z" />
      </g>
    </g>
  </svg>
)
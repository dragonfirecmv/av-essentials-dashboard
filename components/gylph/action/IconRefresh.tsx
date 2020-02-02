import { h } from 'preact'


interface IProps {
  id: string
  fill?: string
}

export const IconRefresh = ({ id, fill }: IProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35.98 36">
    <defs>
      <style>{`.path-fill{fill:${fill || "#231f20"};}`}</style>
    </defs>
    <title>Refresh Icon</title>
    <g id="Layer_2" data-name="Layer 2">
      <g id="Layer_13" data-name="Layer 13">
        <path class="path-fill" d="M30.69,5.29A18,18,0,1,0,35.37,22.5H30.69A13.49,13.49,0,1,1,18,4.5a13.31,13.31,0,0,1,9.49,4l-7.24,7.25H36V0Z" />
      </g>
    </g>
  </svg>
)
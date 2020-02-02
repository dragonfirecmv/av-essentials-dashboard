import { h } from 'preact'


interface IProps {
  id: string
  fill?: string
}

export const IconVendor = ({ id, fill }: IProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
    <defs>
      <style>{`.path-fill{fill:${fill || "#231f20"};}`}</style>
    </defs>
    <title>IconVendor</title>
    <g id={id} data-name="Layer 2">
      <g id="_2" data-name="2">
        <polygon class="path-fill" points="16 36 16 40 24 40 24 36 24 26 16 26 16 36" />
        <path class="path-fill" d="M8,16H8a4,4,0,0,1-3.45,2A4.75,4.75,0,0,1,4,18V36H0a4,4,0,0,0,4,4h9V36H8Z" />
        <path class="path-fill" d="M32,12a4,4,0,0,0,8,0,4,4,0,0,0-.82-2.4h0L34.4,3.2A8,8,0,0,0,28,0H12A8,8,0,0,0,5.6,3.2L.88,9.5h0A4,4,0,1,0,8,12a4,4,0,0,0,8,0,4,4,0,0,0,8,0,4,4,0,0,0,8,0Z" />
        <path class="path-fill" d="M36,18a4.75,4.75,0,0,1-.53.05A4,4,0,0,1,32,16h0V36H27v4h9a4,4,0,0,0,4-4H36Z" />
      </g>
    </g>
  </svg>
)
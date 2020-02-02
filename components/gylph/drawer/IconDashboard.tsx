import { h } from 'preact'


interface IProps {
  id: string
  fill?: string
}

export const IconDashboard = ({ id, fill }: IProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 36">
    <defs>
      <style>{`.path-fill{fill:${fill || "#231f20"};}`}</style>
    </defs>
    <title>IconDashboard</title>
    <g id={id} data-name="Layer 2">
      <g id="_1" data-name="1">
        <path class="path-fill" d="M36,0H4A4,4,0,0,0,0,4V32a4,4,0,0,0,4,4H36a4,4,0,0,0,4-4V4A4,4,0,0,0,36,0Zm0,32H32V22H24V32H22V22H8V32H4V4H36Z" />
        <rect class="path-fill" x="20" y="10" width="12" height="10" />
        <rect class="path-fill" x="8" y="10" width="10" height="10" />
      </g>
    </g>
  </svg>
)
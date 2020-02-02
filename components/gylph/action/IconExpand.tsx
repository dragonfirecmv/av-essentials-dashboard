import { h } from 'preact'


interface IProps {
  id: string
  fill?: string
}

export const IconExpand = ({ id, fill }: IProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
    <defs>
      <style>{`.path-fill{fill:${fill || "#231f20"};}`}</style>
    </defs>
    <title>Expand</title>
    <g id="Layer_2" data-name="Layer 2">
      <g id="Layer_19" data-name="Layer 19">
        <path class="path-fill" d="M4,36V32H0A4,4,0,0,0,4,36Z" />
        <path class="path-fill" d="M32,0H22a4,4,0,0,0-4,4v8h4V4H32V32H22V24H18v8a4,4,0,0,0,4,4H32a4,4,0,0,0,4-4V4A4,4,0,0,0,32,0Z" />
        <rect class="path-fill" y="26" width="4" height="4" />
        <rect class="path-fill" y="20" width="4" height="4" />
        <rect class="path-fill" y="14" width="4" height="4" />
        <rect class="path-fill" y="8" width="4" height="4" />
        <rect class="path-fill" x="6" width="4" height="4" />
        <path class="path-fill" d="M0,4V6H4V0A4,4,0,0,0,0,4Z" />
        <rect class="path-fill" x="12" width="4" height="4" />
        <rect class="path-fill" x="6" y="32" width="4" height="4" />
        <rect class="path-fill" x="12" y="32" width="4" height="4" />
        <polygon class="path-fill" points="28 20 28 16 14 16 14 12 8 18 14 24 14 16.57 14 20 28 20" />
      </g>
    </g>
  </svg>
)
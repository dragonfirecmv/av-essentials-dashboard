import { h } from 'preact'


interface IProps {
  id: string
  fill?: string
}

export const IconTransactions = ({ id, fill }: IProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 40">
    <defs>
      <style>{`.path-fill{fill:${fill || "#231f20"};}`}</style>
    </defs>
    <title>IconTransactions</title>
    <g id={id} data-name="Layer 2">
      <g id="Layer_17" data-name="Layer 17">
        <path class="path-fill" d="M33,3,30,0,27,3,24,0,21,3,18,0,15,3,12,0,9,3,6,0,3,3,0,0V40l3-3,3,3,3-3,3,3,3-3,3,3,3-3,3,3,3-3,3,3,3-3,3,3V0Zm0,30-3,3-3-3-3,3-3-3-3,3-3-3-3,3L9,33,6,36,3,33V7L6,4,9,7l3-3,3,3,3-3,3,3,3-3,3,3,3-3,3,3Z" />
        <rect class="path-fill" x="8" y="24" width="20" height="4" />
        <rect class="path-fill" x="8" y="12" width="20" height="4" />
        <rect class="path-fill" x="8" y="18" width="20" height="4" />
      </g>
    </g>
  </svg>
)
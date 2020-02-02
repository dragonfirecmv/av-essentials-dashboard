import { h } from 'preact'


interface IProps {
  id: string
  fill?: string
}

export const SvgSeparator = ({ id, fill }: IProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 28">
    <defs>
      <style>{`.path-fill{fill:${fill || "#231f20"};}`}</style>
    </defs>
    <title>Separator</title>
    <g id="Layer_2" data-name="Layer 2">
      <g id="Layer_1-2" data-name="Layer 1">
        <circle class="path-fill" cx="4" cy="4" r="4" />
        <circle class="path-fill" cx="4" cy="24" r="4" />
        <circle class="path-fill" cx="4" cy="14" r="4" />
      </g>
    </g>
  </svg>
)
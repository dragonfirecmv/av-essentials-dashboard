import { h } from 'preact'


interface IProps {
  id: string
  fill?: string
}

export const IconSellable = ({ id, fill }: IProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 37">
    <defs>
      <style>{`.path-fill{fill:${fill || "#231f20"};}`}</style>
    </defs>
    <title>Asset 14</title>
    <g id={id} data-name="Layer 2">
      <g id="Layer_9" data-name="Layer 9">
        <path class="path-fill" d="M22.1,19A4.71,4.71,0,0,0,18,21.55,4.72,4.72,0,0,0,13.9,19a5,5,0,0,0-4.79,5.19,5.39,5.39,0,0,0,1.23,3.44L18,37l7.64-9.32h0a5.39,5.39,0,0,0,1.27-3.49A5,5,0,0,0,22.1,19Z" />
        <path class="path-fill" d="M33,3a3,3,0,0,1-3-3,3,3,0,0,1-6,0,3,3,0,0,1-6,0,3,3,0,0,1-6,0A3,3,0,0,1,6,0,3,3,0,0,1,0,0L1,33a4,4,0,0,0,4,4H15.33L12,33H5L4.08,7.29A3,3,0,0,0,9,5a3,3,0,0,0,6,0,3,3,0,0,0,6,0,3,3,0,0,0,6,0,3,3,0,0,0,4.92,2.29L31,33H24l-3.37,4H31a4,4,0,0,0,4-4L36,0A3,3,0,0,1,33,3Z" />
      </g>
    </g>
  </svg>
)
import { h, Fragment as F } from 'preact'
import ModalController from './controllers/Modal/ModalController';
import { ProcessInfoController } from './controllers/ProcessInfo/ProcessInfoController';


export default (props: IProps) => (
  <F>
    { props.children }

    <ModalController/>
    <ProcessInfoController/>
  </F>
)

interface IProps {
  children?: any
}
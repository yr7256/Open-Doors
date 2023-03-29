import React from 'react';
import Draggable from 'react-draggable';
import { Resizable, ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import '../../styles/Menu/Modal.css'
import TrafficInfo from '../Traffic/TrafficInfo';
import PickCategory from '../Recommend/PickCategory';
import Bookmark from '../Bookmark/Bookmark';

interface ModalProps {
  id: string;
  title: string;
  show: boolean;
  handleClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ id, title, show, handleClose, children }) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';

  return (
    <div className={showHideClassName} id={id}>
      <div className="modal-content">
        <span className="close" onClick={handleClose}>
          &times;
        </span>
        <h3>{title}</h3>
        {children}
        {id === 'recommend' ? <PickCategory />: null}
        {id === 'bookmark' ? <Bookmark />: null}
        {id === 'trafficinfo' ? <TrafficInfo />: null}
      </div>
    </div>
    // <div className={showHideClassName} id={id}>
    //   <Draggable>
    //     <Resizable
    //       className="modal-content"
    //       width={300}
    //       height={200}
    //       minConstraints={[200, 100]}
    //       maxConstraints={[800, 600]}
    //       axis="y"
    //       handle={<div className="resize-handle-top" />}
    //     >
    //       <span className="close" onClick={handleClose}>
    //         &times;
    //       </span>
    //       <h3>{title}</h3>
    //       {children}
    //     </Resizable>
    //   </Draggable>
    // </div>
  );
};

export default Modal;
import React, { ReactNode, useState, useEffect, useRef } from 'react';
import { Resizable, ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import '../../styles/Menu/Modal.css';
import TrafficInfo from '../Traffic/TrafficInfo';
import PickCategory from '../Recommend/PickCategory';
import Bookmark from '../Bookmark/Bookmark';

interface ModalProps {
	id: string;
	title: string;
	show: boolean;
	handleClose: () => void;
	children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ id, title, show, handleClose, children }) => {
	const h = window.innerHeight * 0.78;
	const showHideClassName = show ? 'modal display-block' : 'modal display-none';
	const [height, setHeight] = useState(200);
	const modalRef = useRef<HTMLDivElement>(null);
	const wrapperRef = useRef<HTMLDivElement>(null);

	const handleResize = (event: any, data: any) => {
		const { deltaY } = data;
		setHeight((prevHeight) => prevHeight - deltaY);
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
			handleClose();
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		// <Draggable>
		// 	<div className={showHideClassName} id={id}>
		// 		<div className="modal-content">
		// 			<span className="close" onClick={handleClose}>
		// 				&times;
		// 			</span>
		// 			<h3>{title}</h3>
		// 			{children}
		// 			{id === 'recommend' ? <PickCategory /> : null}
		// 			{id === 'bookmark' ? <Bookmark /> : null}
		// 			{id === 'trafficinfo' ? <TrafficInfo /> : null}
		// 		</div>
		// 	</div>
		// </Draggable>
		<div className="modal-wrapper" ref={wrapperRef}>
			<div className={showHideClassName} id={id} ref={modalRef}>
				<ResizableBox
					className="modal-content"
					// width={300}
					height={200}
					minConstraints={[800, 200]}
					maxConstraints={[800, h]}
					axis="y"
					handle={<div className="resize-handle-top" />}
					resizeHandles={['n']}
					onResize={handleResize}
				>
					<div>
						<span className="close" onClick={handleClose}>
							&times;
						</span>
						<h3>{title}</h3>
						{children}
						{id === 'recommend' ? <PickCategory /> : null}
						{id === 'bookmark' ? <Bookmark /> : null}
						{id === 'trafficinfo' ? <TrafficInfo /> : null}
					</div>
				</ResizableBox>
			</div>
		</div>
	);
};

export default Modal;

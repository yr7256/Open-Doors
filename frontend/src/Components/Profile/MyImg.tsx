import React from 'react';
import basicimg from '../../assets/img/basicimg.png';
import { Image } from '../../styles/Profile/MyImgstyle';

function MyImg() {
	return (
		<>
			<div className="grid grid-cols-16 gap-1">
				<div className="col-start-4 col-end-7">
					<Image src={basicimg} alt="My Image"></Image>
				</div>
			</div>
		</>
	);
}

export default MyImg;

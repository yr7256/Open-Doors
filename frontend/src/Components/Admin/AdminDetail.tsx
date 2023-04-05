import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Modal from '../Menu/Modal';
import WheelChairElevator from '../../assets/img/Barrierfree/disabled-elevator.png';
import Elevator from '../../assets/img/Barrierfree/elevator.png';
import Severalpeople from '../../assets/img/Barrierfree/family.png';
import FirstFloor from '../../assets/img/Barrierfree/first-floor.png';
import GuideDog from '../../assets/img/Barrierfree/guidedog.png';
import FreeParking from '../../assets/img/Barrierfree/parking.png';
import DisabledToilet from '../../assets/img/Barrierfree/toilet.png';
import WheelChair from '../../assets/img/Barrierfree/wheelchair.png';
import AdminCheckBox from './AdminCheckBox';
import '../../styles/Admin/Admin.css';

const sfImages: { [key: string]: string } = {
	'WheelChair Elevator': WheelChairElevator,
	Elevator: Elevator,
	'Several people': Severalpeople,
	'First Floor': FirstFloor,
	'Guide Dog': GuideDog,
	'Free Parking': FreeParking,
	'Disabled Toilet': DisabledToilet,
	WheelChair: WheelChair,
};

const AdminDetail = () => {
	const { id } = useParams();
	const [detaildata, setDetaildata] = useState<any>([]);
	const options = [
		{ key: 'bf', value: '베팟' },
		{ key: 'pf', value: '준팟' },
	];


	const getData = async () => {
		try {
			const response = await axios.get(`/api/spot/${id}`);
			console.log(response.data.data);
			setDetaildata(response.data.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="Admincontainer">
			<div className="Admincontent">
				<p>이름 : {detaildata?.spotName}</p>
				<p>주소: {detaildata?.spotAddress}</p>
				<p>전화번호: {detaildata.spotTelNumber}</p>
				<p>시설 이용 가능 여부</p>
				<div className="AdminIconImgs">
					{detaildata?.spotSfInfos?.map((item: any) => (
						<div key={item.id}>
							<img className="Icon" src={sfImages[item.sfInfo.sfName]} alt="" />
						</div>
					))}
				</div>
				<hr />
				<div className='bfContainer'>
					<p>시설 등급 지정</p>
					<AdminCheckBox options={options} />
				</div>
			</div>
		</div>
	);
};

export default AdminDetail;

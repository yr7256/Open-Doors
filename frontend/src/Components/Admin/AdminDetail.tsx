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

interface Category {
	id: number;
	name: string;
}

const categories: Category[] = [
	{ id: 0, name: '카페' },
	{ id: 1, name: '음식점' },
	{ id: 2, name: '약국' },
	{ id: 31, name: '도서관/서점' },
	{ id: 32, name: '영화관' },
	{ id: 33, name: '공원/체육관 및 야외시설' },
	{ id: 34, name: '문화시설' },
	{ id: 4, name: '숙박시설' },
	{ id: 5, name: '공공기관/법원/우체국' },
	{ id: 6, name: '장애인 복지센터' },
	{ id: 7, name: '상가시설' },
	{ id: 8, name: '버스터미널/지하철역' },
	{ id: 9, name: '기타' },
];

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
	const [placeImage, setPlaceImage] = useState<any>([]);
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
			const imgArr: any[] = [];
			response.data.data.images.map((img: any, index: any) => {
				const a = async () => {
					const b = await axios.get(`https://j8b205.p.ssafy.io/api/spot/image/${id}/${img.pathName}`);
					imgArr.push(b.config.url);
					if (index === response.data.data.images.length - 1) {
						setPlaceImage(imgArr);
					}
				};
				a();
			});
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
				<p>주소 : {detaildata?.spotAddress}</p>
				<p>사진 : </p>
				<div className="AdmincontentImg">
					{placeImage.map((img: any, idx: number) => (
						<img key={img} src={placeImage[idx]} alt="photo"></img>
					))}
				</div>
				{categories.find((category) => category.id === detaildata.spotCategory) && (
					<p>업종 : {categories.find((category) => category.id === detaildata.spotCategory)?.name}</p>
				)}
				<p>전화번호 : {detaildata.spotTelNumber}</p>
				<p>시설 이용 가능 여부 : </p>
				<div className="AdminIconImgs">
					{detaildata?.spotSfInfos?.map((item: any) => (
						<div key={item.id}>
							<img className="Icon" src={sfImages[item.sfInfo.sfName]} alt="" />
						</div>
					))}
				</div>
				<hr />
				<div className="bfContainer">
					<p>시설 등급 지정</p>
					<AdminCheckBox options={options} />
				</div>
			</div>
		</div>
	);
};

export default AdminDetail;

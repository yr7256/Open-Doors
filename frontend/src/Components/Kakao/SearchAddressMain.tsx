import React, { useEffect, useState } from 'react';

import { useNavigate, useLocation } from 'react-router-dom';

const SearchAddressMain = () => {
	const [lat, setLat] = useState<number>();
	const [lng, setLng] = useState<number>();
	const [address, setAddress] = useState('');
	const [res, setRes] = useState('');
	const navigate = useNavigate();

	const goregister = () => {
		navigate('/map/newlocation', { state: {address, lat, lng} });
	};

	const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setAddress(event.target.value);
	};
	const geocoder = new kakao.maps.services.Geocoder();

	const search = () => {
		geocoder.addressSearch(address, function (result: any, status: any) {
			// 정상적으로 검색이 완료됐으면
			if (status === kakao.maps.services.Status.OK) {
				const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
				// console.log(result[0]);
				setLat(result[0].y);
				setLng(result[0].x);
				setRes(result[0].address_name);
				setAddress(result[0].address_name);
			} else {
				setAddress('');
			}
		});
	};

	return (
		<>
			<div>주소검색</div>
			<input type="text" id="address" onChange={handleAddressChange}></input>
			<button type="button" id="searchBtn" onClick={search}>
				검색
			</button>
			<p onClick={goregister}>{res}</p>
		</>
	);
};

export default SearchAddressMain;

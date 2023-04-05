import React, { useEffect, useState } from 'react';

import { useNavigate, useLocation } from 'react-router-dom';

const SearchAddressMain = () => {
	const [lat, setLat] = useState<number>();
	const [lng, setLng] = useState<number>();
	const [address, setAddress] = useState('');
	const [res, setRes] = useState('');
	const navigate = useNavigate();

	const goregister = () => {
		navigate('/map/newlocation', { state: { address, lat, lng } });
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
		<div className='flex w-3/4 flex-col text-center mx-auto mt-5'>
			{/* <div className="flex">
				<div className="w-3/4">
					<input
						className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white"
						// id="inline-full-name"
						type="text"
						id="address"
						placeholder="예) 판교역로 235, 삼평동 681"
						onChange={handleAddressChange}
					/>
				</div>
				<div className="w-1/4">
					<button type="button" id="searchBtn" onClick={search}>
						검색
					</button>
				</div>
			</div> */}
			<div className="relative text-gray-600">
				<input
					type="text"
					name="search"
					placeholder="예) 판교역로 235, 삼평동 681"
					className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white"
					onChange={handleAddressChange}
				/>
				<button type="submit" className="absolute right-0 top-0 mt-3 mr-4" onClick={search}>
					<svg
						className="h-4 w-4 fill-current"
						xmlns="http://www.w3.org/2000/svg"
						xmlnsXlink="http://www.w3.org/1999/xlink"
						version="1.1"
						id="Capa_1"
						x="0px"
						y="0px"
						viewBox="0 0 56.966 56.966"
						xmlSpace="preserve"
						width="512px"
						height="512px"
					>
						<path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
					</svg>
				</button>
			</div>
			<div className='mt-4'>{res ? <p onClick={goregister}>{res}</p> : <p>검색 결과가 없습니다.</p>}</div>
		</div>
	);
};

export default SearchAddressMain;

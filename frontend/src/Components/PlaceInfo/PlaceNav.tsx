import React, { useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Line } from '../../styles/MapDetail/MapDetailstyle';

// component
import DetailHome from '../../Components/PlaceInfo/PlaceDetail/DetailHome';
import DetailPhoto from '../../Components/PlaceInfo/PlaceDetail/DetailPhoto';
import DetailRecommend from '../../Components/PlaceInfo/PlaceDetail/DetailRecommend';
import DetailReview from '../../Components/PlaceInfo/PlaceDetail/DetailReview';

type NavProps = {
	onSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	category: string;
};

function PlaceNav({ onSelect, category }: NavProps) {
	// const location = useLocation();
	// useEffect(() => {
	// 	console.log(location);
	// }, [location]);

	// const locationName = location.pathname;
	// console.log(locationName); // /map/detail/5043036672fcdeec789b123a20f5e8b320181201060637/Home

	const navCategory = [
		{ id: 1, label: '홈' },
		{ id: 2, label: '리뷰' },
		{ id: 3, label: '추천' },
		{ id: 4, label: '지도' },
		{ id: 5, label: '사진' },
	];
	const categoryName = navCategory.map((v: any) => {
		return <h4 key={v.id}>{v.label}</h4>;
	});

	return (
		<>
			<div className="grid grid-cols-16 gap-2">
				<div className="col-start-2 col-span-2">
					<Link to="Home">{categoryName[0]}</Link>
				</div>
				<div className="col-start-4 col-span-2">
					<Link to="review">{categoryName[1]}</Link>
				</div>
				<div className="col-start-6 col-span-2">
					<Link to="recommend">{categoryName[2]}</Link>
				</div>
				<div className="col-start-8 col-span-2">
					<Link to="map">{categoryName[3]}</Link>
				</div>
				<div className="col-start-10 col-span-2">
					<Link to="photo">{categoryName[4]}</Link>
				</div>
			</div>
			<Line />
			<Outlet />
		</>
	);
}

export default PlaceNav;

import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Line, Link } from '../../styles/MapDetail/MapDetailstyle';

type NavCategory = {
	id: number;
	label: string;
};

type NavProps = {
	onSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	category: string;
};

function PlaceNav({ onSelect, category }: NavProps) {
	const navCategory: NavCategory[] = [
		{ id: 1, label: '홈' },
		{ id: 2, label: '리뷰' },
		{ id: 3, label: '추천' },
		{ id: 4, label: '지도' },
		{ id: 5, label: '사진' },
	];
	const categoryName = navCategory.map((v: NavCategory) => {
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

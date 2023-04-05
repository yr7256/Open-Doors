import React from 'react';
import { useNavigate } from 'react-router-dom';

interface MapProps {
	mapdata: any;
}

const Admin = (props: MapProps) => {
	const navigate = useNavigate();
	const goDetailPage = (id: number) => {
		navigate(`${id}`);
	};
	const { mapdata } = props;
	return (
		<>
			{mapdata.map((item: any) => (
				<div key={item.id} onClick={() => goDetailPage(item.id)}>
					{item.state !== 'access' ? (
						<>
							<span>{item.id} </span> <span>{item.spotName}</span>
						</>
					) : null}
				</div>
			))}
		</>
	);
};

export default Admin;

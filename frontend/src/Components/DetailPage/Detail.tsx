import React from 'react';
import { useParams } from 'react-router-dom';

const Detail = () => {
	const { id } = useParams();
  // 여기서 id로 통신해서 데이터 받아오기
	return <div>{id}</div>;
};

export default Detail;

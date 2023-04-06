import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Admin/Admin.css';
// import mapdata from '../../csvjson2.json';

interface MapProps {
	data: any;
}

const Admin = (props: MapProps) => {
	const navigate = useNavigate();
	const goDetailPage = (id: number) => {
		navigate(`${id}`);
	};
	const { data } = props;
	const mapdata = data.filter((item: any) => item.state === 'ready');
	const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
	const [itemsPerPage, setItemsPerPage] = useState(10); // 페이지 당 보여줄 아이템 수
	const [pageLimit, setPageLimit] = useState(10); // 보이는 페이지 버튼 개수

	// 현재 페이지에서 보여줄 아이템을 결정하는 함수
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = mapdata.slice(indexOfFirstItem, indexOfLastItem);

	// 페이지 번호 목록을 만드는 함수
	const pageNumbers = [];
	for (let i = 1; i <= Math.ceil(mapdata.length / itemsPerPage); i++) {
		pageNumbers.push(i);
	}

	const maxPage = Math.ceil(pageNumbers.length / pageLimit);
	const currentPageGroup = Math.ceil(currentPage / pageLimit);
	const startPage = (currentPageGroup - 1) * pageLimit + 1;
	const endPage = currentPageGroup * pageLimit;
	const displayPages = pageNumbers.slice(startPage - 1, endPage);

	// 페이지 번호를 클릭했을 때 실행되는 함수
	const handleClick = (event: any) => {
		setCurrentPage(Number(event.target.id));
	};

	return (
		<div className="AdminWrap">
			<h1>등록 대기 장소 목록</h1>
			<div className="AdminMainContainer">
				{currentItems.map((item: any) => (
					<div className="AdminMainBox" key={item.id} onClick={() => goDetailPage(item.id)}>
						<div className="AdminMainContent">
							<span>{item.id} </span>
							<span>{item.spotName}</span>
						</div>
					</div>
				))}
			</div>
			<ul className="pagination">
				<li onClick={() => setCurrentPage(currentPage === 1 ? 1 : currentPage - 1)}>Prev</li>
				{displayPages.map((number) => (
					<li
						key={number}
						id={number.toString()}
						onClick={handleClick}
						className={currentPage === number ? 'active' : ''}
					>
						{number}
					</li>
				))}
				<li onClick={() => setCurrentPage(currentPage === maxPage ? maxPage : currentPage + 1)}>Next</li>
			</ul>
		</div>
	);
};

export default Admin;

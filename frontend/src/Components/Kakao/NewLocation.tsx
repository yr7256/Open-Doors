import React, { ChangeEvent, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../styles/Kakao/NewLocation.css';
import { Head, Line } from '../../styles/Kakao/SearchAddress';
import axios from 'axios';

const NewLocation = () => {
	const navigate = useNavigate();
	const { state } = useLocation();

	const bflist = [
		{ key: '1', value: '휠체어 접근 가능' },
		{ key: '2', value: '해당 장소가 1층에 위치함' },
		{ key: '3', value: '장애인 화장실 있음' },
		{ key: '4', value: '애완견/도우미견 출입가능' },
		{ key: '5', value: '장애인 엘리베이터 있음' },
		{ key: '6', value: '엘리베이터 있음' },
		{ key: '7', value: '건물 내 무료주차 가능' },
		{ key: '8', value: '가족/어린이 이용에 적합' },
	];

	const [name, setName] = useState('');
	// const [address, setAddress] = useState('');
	const [addressdetail, setAddressdetail] = useState('');
	const [category, setCategory] = useState('');
	const [telnum, setTelnum] = useState('');
	const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
	const [checkedList, setCheckedList] = useState<string[]>([]);

	const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
		const filesArray = Array.from(event.target.files || []);
		setSelectedFiles((prevSelectedFiles) => [...prevSelectedFiles, ...filesArray]);
	};

	const handleFileDelete = (fileIndex: number) => {
		setSelectedFiles((prevSelectedFiles) => prevSelectedFiles.filter((_, index) => index !== fileIndex));
	};

	const handleFileUpload = () => {
		// do something with the selected files
		console.log(selectedFiles);
	};

	const checkListHandler = (data: string, isChecked: boolean) => {
		if (isChecked) {
			setCheckedList([...checkedList, data]);
		} else if (!isChecked) {
			setCheckedList(checkedList.filter((el) => el !== data));
		}
	};

	const goSearch = () => {
		navigate('/map/newlocation/search');
	};

	const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setName(event.target.value);
	};

	const handleDetailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setAddressdetail(event.target.value);
	};

	const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setCategory(event.target.value);
	};

	const handleTelnumChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTelnum(event.target.value);
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			const response = await axios.post(
				'http://192.168.31.134/api/spot/save',
				{
					spot: {
						spotName: name,
						spotAddress: state?.address,
						spotBuildingName: addressdetail,
						spotCategory: category,
						spotTelNumber: telnum,
						spotLat: state?.lat,
						spotLng: state?.lng,
					},
					sfInfos: checkedList,
				},
				{
					headers: {
						access_token: 123,
					},
				}
			);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<>
			<Head>
				<h1
					className="back"
					onClick={() => {
						navigate('/map');
					}}
				>
					&lt;
				</h1>
				<h1>장소 등록하기</h1>
			</Head>
			<Line />
			<form className="w-60 max-w-sm mx-auto mt-5" onSubmit={handleSubmit}>
				<div className="md:flex md:items-center mb-6">
					<div className="md:w-1/3">
						<label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">장소명 (필수)</label>
					</div>
					<div className="md:w-2/3">
						<input
							className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
							// id="inline-full-name"
							type="text"
							placeholder="시설의 이름을 입력해주세요."
							onChange={handleNameChange}
						/>
					</div>
				</div>
				<div className="md:flex md:items-center mb-6">
					<div className="md:w-1/3">
						<p className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">위치 (필수)</p>
					</div>
					<div className="md:w-2/3">
						<button
							className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 text-sm"
							onClick={goSearch}
						>
							{state ? state.address : '여기를 눌러 주소를 검색해주세요.'}
						</button>
						<input
							className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 text-sm mt-3"
							// id="inline-full-name"
							type="text"
							placeholder="상세 정보를 입력하세요."
							onChange={handleDetailChange}
						/>
					</div>
				</div>
				<div className="md:flex md:items-center mb-6">
					<div className="md:w-1/3">
						<label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">사진등록</label>
					</div>
					<div className="md:w-2/3 filebox">
						<label htmlFor="file">파일찾기</label>
						<input
							type="file"
							className="w-full shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
							id="file"
							multiple
							onChange={handleFileSelect}
						/>
						{selectedFiles.length > 0 && (
							<ul>
								{selectedFiles.map((file, index) => (
									<li key={index}>
										<img className="filesize" src={URL.createObjectURL(file)} alt={file.name} />
										{/* {file.name} */}
										<button onClick={() => handleFileDelete(index)}>Delete</button>
									</li>
								))}
							</ul>
						)}
					</div>
				</div>
				<div className="md:flex md:items-center mb-6">
					<div className="md:w-1/3">
						<label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">업종</label>
					</div>
					<div className="md:w-2/3">
						<input
							className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
							// id="inline-full-name"
							type="text"
							placeholder="예) 음식점, 카페 등"
							onChange={handleCategoryChange}
						/>
					</div>
				</div>
				<div className="md:flex md:items-center mb-6">
					<div className="md:w-1/3">
						<label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">전화번호</label>
					</div>
					<div className="md:w-2/3">
						<input
							className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
							// id="inline-full-name"
							type="text"
							placeholder="대표 전화번호를 입력해주세요."
							onChange={handleTelnumChange}
						/>
					</div>
				</div>
				<div className="md:flex md:items-center mb-6">
					<div className="md:w-1/3">
						<label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">시설 이용 가능 여부</label>
					</div>
					<div className="md:w-2/3">
						{bflist.map((item) => {
							return (
								<label key={item.key}>
									<input
										type="checkbox"
										value={item.key}
										onChange={(e: ChangeEvent<HTMLInputElement>) => {
											console.log(e.target);
											checkListHandler(e.target.value, e.target.checked);
										}}
										checked={checkedList.includes(item.key) ? true : false}
									/>
									<p>{item.value}</p>
								</label>
							);
						})}
					</div>
				</div>
				<div className="md:flex md:items-center">
					<div className="md:w-1/3"></div>
					<div className="md:w-2/3">
						<button
							className="w-full shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
							type="button"
						>
							등록완료
						</button>
					</div>
				</div>
			</form>
		</>
	);
};

export default NewLocation;

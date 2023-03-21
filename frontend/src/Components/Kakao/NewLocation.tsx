import React, { ChangeEvent, useState } from 'react';
import '../../styles/Kakao/NewLocation.css';

type Data = {
	key: number;
	value: string;
};

const NewLocation = () => {
	const bflist = [
		{ key: 1, value: '휠체어 접근 가능' },
		{ key: 2, value: '해당 장소가 1층에 위치함' },
		{ key: 3, value: '장애인 화장실 있음' },
		{ key: 4, value: '애완견/도우미견 출입가능' },
		{ key: 5, value: '장애인 엘리베이터 있음' },
		{ key: 6, value: '엘리베이터 있음' },
		{ key: 7, value: '건물 내 무료주차 가능' },
		{ key: 8, value: '가족/어린이 이용에 적합' },
	];

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

	return (
		<>
			<p>취소</p>
			<h1 className="flex justify-center">신규 장소 추가</h1>
			<p>보내기</p>
			<hr />
			<form className="w-60 max-w-sm mx-auto mt-5" onSubmit={(e) => e.preventDefault()}>
				<div className="md:flex md:items-center mb-6">
					<div className="md:w-1/3">
						<label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">장소명 (필수)</label>
					</div>
					<div className="md:w-2/3">
						<input
							className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
							id="inline-full-name"
							type="text"
							placeholder="시설의 이름을 입력해주세요."
						/>
					</div>
				</div>
				<div className="md:flex md:items-center mb-6">
					<div className="md:w-1/3">
						<label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">위치 (필수)</label>
					</div>
					<div className="md:w-2/3">
						<input
							className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
							id="inline-full-name"
							type="text"
							placeholder="여기를 눌러 주소를 검색해주세요."
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
										<img src={URL.createObjectURL(file)} alt={file.name} />
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
							id="inline-full-name"
							type="text"
							placeholder="예) 음식점, 카페 등"
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
							id="inline-full-name"
							type="text"
							placeholder="대표 전화번호를 입력해주세요."
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
										value={item.value}
										onChange={(e: ChangeEvent<HTMLInputElement>) => {
											checkListHandler(e.target.value, e.target.checked);
										}}
										checked={checkedList.includes(item.value) ? true : false}
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

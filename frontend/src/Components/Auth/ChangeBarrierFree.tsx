import React, { useState } from 'react';
import axios from 'axios';
import { Label, Condition, BarrierLabel } from '../../styles/Auth/SignUpInputstyle';
import { Button } from '../../styles/Button/ButtonStyle';

type Facility = {
	id: number;
	label: string;
};

function ChangeBarrierFree() {
	const facilitiesList: Facility[] = [
		{ id: 1, label: '휠체어 접근 가능' },
		{ id: 2, label: '애완견/도우미견 출입 가능' },
		{ id: 3, label: '장애인 엘리베이터 있음' },
		{ id: 4, label: '건물 내 무료 주차 가능' },
		{ id: 5, label: '장애인 화장실 있음' },
		{ id: 6, label: '엘리베이터 있음' },
		{ id: 7, label: '가족/어린이 이용에 적합' },
		{ id: 8, label: '해당 장소가 1층에 위치함' },
	];

	const [selectedFacilities, setSelectedFacilities] = useState<Facility[]>([]);
	const toggleCheckbox = (facility: Facility) => {
		if (selectedFacilities.some((f) => f.id === facility.id)) {
			setSelectedFacilities(selectedFacilities.filter((f) => f.id !== facility.id));
		} else {
			setSelectedFacilities([...selectedFacilities, facility]);
		}
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(selectedFacilities);
	};

	// 백엔드 미구현
	const changeBarrierFree = async () => {
		const accessToken = localStorage.getItem('accessToken');
		const requestInfo = {
			url: '',
			method: '',
			headers: {
				'Content-type': 'application/json',
				Authorization: `Bearer ${accessToken}`,
			},
			data: {},
		};
		try {
			const submitReviewForm = await axios(requestInfo);
			// console.log(submitReviewForm);
		} catch (err) {
			// console.log(err);
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<br />
				<div className="grid grid-cols-16 gap-1">
					<div className="col-start-2 col-end-14">
						<BarrierLabel>배리어프리 여부(중복선택 가능)</BarrierLabel>
						<br />
						<br />
						{facilitiesList.map((facility) => (
							<div key={facility.id}>
								<Label>
									<Condition
										type="checkbox"
										checked={selectedFacilities.some((f) => f.id === facility.id)}
										onChange={() => toggleCheckbox(facility)}
									/>
									{facility.label}
								</Label>
							</div>
						))}

						<br />
						<div className="grid grid-cols-16 gap-1">
							<div className="col-start-1 col-end-14">
								<Button type="submit" onClick={changeBarrierFree}>
									변경하기
								</Button>
							</div>
						</div>
					</div>
				</div>
			</form>
		</>
	);
}

export default ChangeBarrierFree;

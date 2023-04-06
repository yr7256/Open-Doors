import React, { useState } from 'react';
import axios from 'axios';
import { Label, Condition, BarrierLabel } from '../../styles/Auth/SignUpInputstyle';
import { Button } from '../../styles/Button/ButtonStyle';
import { useNavigate } from 'react-router-dom';

type Facility = {
	id: number;
	label: string;
};

function ChangeBarrierFree() {
	const navigate = useNavigate();
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

	const accessToken = localStorage.getItem('accessToken');
	const [selectedFacilities, setSelectedFacilities] = useState<number[]>([]);
	const toggleCheckbox = (facility: Facility) => {
		if (selectedFacilities.includes(facility.id)) {
			setSelectedFacilities(selectedFacilities.filter((id) => id !== facility.id));
		} else {
			setSelectedFacilities([...selectedFacilities, facility.id]);
		}
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};

	const changeBarrierFree = async () => {
		try {
			const response = await axios.put(
				'/api/user/change/preference',
				{ sfInfoIds: selectedFacilities },
				{
					headers: { Authorization: `Bearer ${accessToken}` },
				}
			);
			// console.log(response);
			alert('배리어프리 항목이 변경되었습니다.');
			navigate('/Mypage/MyInfoManage');
		} catch (error) {
			// console.log(error);
			alert('배리어프리 항목이 변경되지 않았습니다. 다시 시도해 주세요.');
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
										checked={selectedFacilities.some((f) => f === facility.id)}
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

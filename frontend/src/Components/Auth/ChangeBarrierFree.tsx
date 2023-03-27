import React, { useState } from 'react';
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

	return (
		<>
			<form>
				<br />
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
				<Button type="submit">변경하기</Button>
			</form>
		</>
	);
}

export default ChangeBarrierFree;

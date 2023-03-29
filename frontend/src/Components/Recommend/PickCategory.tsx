import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Fotter } from '../../styles/Recommend/PickCategorystyle';

function PickCategory() {
	return (
		<>
			<Fotter>
				<br />
				<h4>원하는 활동을 선택하세요.</h4>
			</Fotter>
		</>
	);
}

export default PickCategory;

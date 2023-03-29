import React from 'react';

type Props = {
	modalHandler: () => void;
}

const PickCategory: React.FC<Props> = ( {modalHandler} ) => {
	return (
		<>
			<p>원하는 활동을 선택하세요.</p>
		</>
	);
}

export default PickCategory;

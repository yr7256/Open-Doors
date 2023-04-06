import React, { useState } from 'react';
import { Button } from '../../styles/Button/ButtonStyle';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../../styles/Admin/Admin.css';

interface AdminCheckBoxProps {
	options: { key: string; value: string }[];
}

const AdminCheckBox: React.FC<AdminCheckBoxProps> = ({ options }) => {
	const { id } = useParams();
	const navigate = useNavigate();
	console.log(id);
	const [selectedOption, setSelectedOption] = useState('');
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSelectedOption(event.target.value);
	};

	const LocSubmit = async () => {
		try {
			const response = await axios.post(
				'/api/spot/access',
				{ state: 'access', id: id, rate: selectedOption },
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
					},
				}
			);
			console.log(response);
			alert('등록되었습니다.')
			navigate('/admin');
		} catch (err) {
			console.error(err);
			alert('등록되지 않았습니다.')
		}
	};

	const LocDelete = async () => {
		try {
			const response = await axios.delete(
				`/api/spot/${id}`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
					},
				}
			);
			console.log(response);
			alert('삭제되었습니다.')
			navigate('/admin');
		} catch (err) {
			console.error(err);
			alert('삭제되지 않았습니다.')
		}
	};

	return (
		<div>
			{options.map((option, index) => (
				<div key={index} className="checkBoxContainer">
					<input
						type="radio"
						id={`option-${option.key}`}
						name="options"
						value={option.key}
						checked={selectedOption === option.key}
						onChange={handleChange}
					/>
					<label htmlFor={`option-${option.key}`}>{option.value}</label>
				</div>
			))}
			<div className="AdminBtnStyle">
				<Button onClick={LocSubmit}>등록 완료</Button>
			</div>
			<div className="AdminBtnStyle">
				<Button className='AdminDetailCancelBtn' onClick={LocDelete}>등록 취소</Button>
			</div>
		</div>
	);
};

export default AdminCheckBox;

import React, { useState } from 'react';
import { Birth } from '../../types/auth';
import { Birthinput, Label, BirtYearinput } from '../../styles/Auth/SignUpInputstyle';

function Birthday() {
	const [formData, setFormData] = useState<Birth>({
		birthYear: '',
		birthMonth: '',
		birthDay: '',
	});

	const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	return (
		<form>
			<Label>생년월일</Label>
			<br />
			<BirtYearinput type="number" name="birthYear" value={formData.birthYear} onChange={handleInput} />
			년
			<Birthinput type="number" name="birthMonth" value={formData.birthMonth} onChange={handleInput} />
			월
			<Birthinput type="number" name="birthDay" value={formData.birthDay} onChange={handleInput} />일
		</form>
	);
}

export default Birthday;

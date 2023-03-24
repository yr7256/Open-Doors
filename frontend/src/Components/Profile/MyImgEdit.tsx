import React, { ChangeEvent, useState } from 'react';

interface Image {
	id: number;
	name: string;
	url: string;
}

function MyImgEdit() {
	const [selectedImage, setSelectedImage] = useState<Image | null>(null);

	const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			setSelectedImage(event.target.selectedImage);
		}

		const formData = new FormData();
		if (selectedImage) {
			formData.append('file', files);
		}
	};

	return <div />;
}

export default MyImgEdit;

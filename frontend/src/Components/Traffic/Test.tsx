import React, { useEffect } from 'react';
import axios from 'axios';

const page = 1;

async function getData() {
	try {
		const response = await axios.get(`https://cors-anywhere.herokuapp.com/http://openapitraffic.daejeon.go.kr/api/rest/busreginfo/getBusRegInfoAll?serviceKey=yfzRro1BbzFgxTncMEUf3K1z%2FDBImnHc0De3Xze7N1H%2FnLRvFZgqSQRfLodifiRmeVc3Git8rZehejUpkB%2BSkw%3D%3D&reqPage=${page}`, 
		// {
		// 	params: {
		// 		serviceKey:
		// 			'yfzRro1BbzFgxTncMEUf3K1z%2FDBImnHc0De3Xze7N1H%2FnLRvFZgqSQRfLodifiRmeVc3Git8rZehejUpkB%2BSkw%3D%3D',
		// 		reqPage: page,
		// 	},
		// });
		);
		const xml = response.data;
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xml, 'application/xml');
    const items = xmlDoc.getElementsByTagName('itemList');
    // console.log(items);
	} catch (error) {
		console.error(error);
	}
}

function Test() {
	useEffect(() => {
		getData();
	}, []);

	return <div>My component</div>;
}

export default Test;

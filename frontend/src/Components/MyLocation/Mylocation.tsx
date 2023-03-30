import React, {useEffect} from "react";
import { Head, Line } from '../../styles/Kakao/SearchAddress';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Mylocation = () => {
  const navigate = useNavigate();
  const getData = async () => {
    // event.preventDefault();
    try {
      const response = await axios.get(
        'http://192.168.31.134:8080/api/spots',
        // {
        //   headers: {
        //     Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        //   },
        // }
      );
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getData();
  }, [])

  return <>
			<Head>
				<h1
					className="back"
					onClick={() => {
						navigate('/map');
					}}
				>
					&lt;
				</h1>
				<h1>내가 등록한 장소</h1>
			</Head>
			<Line />
  </>
}

export default Mylocation
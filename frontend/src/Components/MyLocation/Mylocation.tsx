import React, {useEffect} from "react";
import axios from "axios";

const Mylocation = () => {
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

  return <div>1</div>
}

export default Mylocation
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RegisterMapAction } from '../../store/RegisterMapSlice'
import '../../styles/Kakao/NewLocation.css';

const Checkbox = ({ key, id, label }: any) => {
  const dispatch = useDispatch();
  const checked = useSelector((state: any) => state.registerMap.checkedList.includes(id));
  const data = useSelector((s: any) => s.registerMap.checkedList);

  
  const handleChange = () =>
  {
    dispatch(RegisterMapAction.toggleChecked(id));
  }

  return (
    <div className='box'>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        id={id}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default Checkbox;
import React, { useState, useCallback } from "react";

type Facility = {
  id: number;
  label: string;
};

function FacilitesInput() {
  const facilitiesList: Facility[] = [
    { id: 1, label: "휠체어 접근 가능" },
    { id: 2, label: "해당 장소가 1층에 위치함" },
    { id: 3, label: "장애인 화장실 있음" },
    { id: 4, label: "애완견/도우미견 출입 가능" },
    { id: 5, label: "장애인 엘리베이터 있음" },
    { id: 6, label: "엘리베이터 있음" },
    { id: 7, label: "건물 내 무료 주차 가능" },
    { id: 8, label: "가족/어린이 이용에 적합" },
  ];

  const [selectedFacilities, setSelectedFacilities] = useState<Facility[]>([]);

  const toggleCheckbox = (facility: Facility) => {
    if (selectedFacilities.some((f) => f.id === facility.id)) {
      setSelectedFacilities(
        selectedFacilities.filter((f) => f.id !== facility.id)
      );
    } else {
      setSelectedFacilities([...selectedFacilities, facility]);
    }
  };

  // const onSubmit = useCallback(
  //   (e: React.FormEvent<HTMLFormElement>) => {
  //     e.preventDefault();
  //     console.log("checkedList:", selectedFacilities);
  //   },
  //   [selectedFacilities]
  // );

  return (
    <>
      {facilitiesList.map((facility) => (
        <div key={facility.id}>
          <label>
            <input
              type="checkbox"
              checked={selectedFacilities.some((f) => f.id === facility.id)}
              onChange={() => toggleCheckbox(facility)}
            />
            {facility.label}
          </label>
        </div>
      ))}
    </>
  );
}

export default FacilitesInput;

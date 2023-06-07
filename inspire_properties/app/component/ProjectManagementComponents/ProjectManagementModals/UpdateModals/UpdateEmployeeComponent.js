import React, { useEffect, useState } from 'react';

function UpdateEmployeeComponent(props) {
    //props
    //onHoursWorkedChange
    //employeeId
    

    const [hoursWorked, setHoursWorked] = useState('');


  const handleHoursWorkedChange = (event) => {
    setHoursWorked(event.target.value);
    props.onHoursWorkedChange(props.employeeId, event.target.value,props.date,props.projectId);
  };

  return (
    <div>
      <input
        id="hoursWorked"
        type="number"
        value={hoursWorked}
        onChange={handleHoursWorkedChange}
      />
    </div>
  );
}

export default UpdateEmployeeComponent;

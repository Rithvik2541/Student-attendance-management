import React from 'react';
import ReactSpeedometer from 'react-d3-speedometer';

const Speedometer = ({ value }) => {
  return (
    <div className='d-block m-auto '>
      <ReactSpeedometer 
        maxValue={100}
        value={value}
        needleColor="black"
        customSegmentStops={[0, 65, 75, 100]}
        segmentColors={['#FF0000', 'rgb(255, 183, 3)', 'rgb(96, 146, 71)']}
        currentValueText={`Attendance: ${value.toFixed(2)}%`}
        textColor="#000000"
      />
    </div>
  );
};

export default Speedometer;
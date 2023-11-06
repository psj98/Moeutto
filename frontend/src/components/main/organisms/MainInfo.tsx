import React from 'react';

// import TodayDate from '../atoms/TodayDate';
import Location from '../molecules/Location';

interface MainInfoPropsType {
  currentLocation: any;
  address: string;
  showLocationClick: () => void;
}

const MainInfo: React.FC<MainInfoPropsType> = ({ currentLocation, address, showLocationClick }) => {
  return (
    <div>
        {/* <TodayDate /> */}
      <div className="flex mt-1">
        <Location currentLocation={currentLocation} address={address} showLocationClick={showLocationClick} />
      </div>
    </div>
  );
};

export default MainInfo;

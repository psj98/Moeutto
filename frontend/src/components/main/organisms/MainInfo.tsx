import React from 'react';

import TodayDate from '../atoms/TodayDate';
import UserName from '../atoms/UserName';
import Location from '../molecules/Location';

interface MainInfoPropsType {
  currentLocation: any;
  address: string;
  showLocationClick: () => void;
}

const MainInfo: React.FC<MainInfoPropsType> = ({ currentLocation, address, showLocationClick }) => {
  return (
    <div>
        <TodayDate />
      <div className="flex justify-end mt-1">
        <Location currentLocation={currentLocation} address={address} showLocationClick={showLocationClick} />
      </div>
        <UserName />
    </div>
  );
};

export default MainInfo;

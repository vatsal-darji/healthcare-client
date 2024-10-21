import React from "react";

const NavigationBar: React.FC = () => {
  return (
    <div className="w-full h-14 flex flex-row justify-between items-center bg-bk-blue text-bk-white sticky top-0 z-10">
      <p className="md:pl-10">Health.AI</p>
      <p className="md:pr-10">Request Information</p>
    </div>
  );
};

export default NavigationBar;

// TimeCard.tsx
import React from "react";
import { ResponseData } from "./types"; // Adjust the import path as needed

interface TimeCardProps {
  responseData: ResponseData | null;
}

const TimeCard: React.FC<TimeCardProps> = ({ responseData }) => {
  return (
    <div className="h-96">
      <p>Travel Time: {responseData?.travel_time}</p>
      <p>Direct Time: {responseData?.direct_time}</p>
    </div>
  );
};

export default TimeCard;

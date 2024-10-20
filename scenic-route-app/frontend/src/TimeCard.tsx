// TimeCard.tsx
import { ResponseData } from "./types"; // Adjust the import path as needed

interface TimeCardProps {
  responseData: ResponseData | null;
}

export default function TimeCard({ responseData }: TimeCardProps) {
  return (
    <div className="h-96 p-4">
      {responseData?.stops ? (
        <div className="space-y-4 flex flex-col items-center h-full mt-10">
          <div className="space-y-1 w-full">
            <h3 className="text-l font-medium">Travel Time</h3>
            <p className="text-4xl font-extrabold text-center">
              {responseData?.travelTime}
            </p>
          </div>
          <div className="space-y-1 w-full">
            <h3 className="text-l font-medium">Direct Time</h3>
            <p className="text-4xl font-extrabold text-center">
              {responseData?.directTime}
            </p>
          </div>
        </div>
      ) : (
        <p className="text-center text-muted-foreground">
          No trip planned yet. Plan your journey to see when you'll get there!
        </p>
      )}
    </div>
  );
}

interface Stop {
  name: string;
  description: string;
  willingness_score: number;
}

export default function StopsList({ responseData }: any) {
  return (
    <div className="w-full h-full">
      {/* Display the stops if responseData is available */}
      {responseData && responseData.stops && (
        <div className="w-full max-w-md mt-6">
          <h2 className="text-xl font-semibold mb-4">Suggested Stops:</h2>
          {responseData.stops.map((stop: any, index: number) => (
            <StopCard
              key={index}
              name={stop.name}
              description={stop.description}
              willingness_score={stop.willingness_score}
            />
          ))}
        </div>
      )}
    </div>
  );
}
function StopCard({ name, description, willingness_score }: Stop) {
  return (
    <div className="border rounded-md p-4 mb-4">
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-sm text-gray-700">{description}</p>
      <p className="text-sm text-gray-500">
        Willingness Score: {willingness_score}
      </p>
    </div>
  );
}

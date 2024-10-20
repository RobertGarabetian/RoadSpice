import { ScrollArea } from "./components/ui/scroll-area";
interface Stop{
    name: string,
    state: string,
    description: string,
    coordinates: {
      lat: number,
      long: number
    }
  }
  interface StopsListProps {
    responseData: {
      stops: Stop[];
    } | null;
  }


export default function StopsList({ responseData }: StopsListProps) {
  return (
    <ScrollArea className="h-96 w-full">
      {responseData?.stops ? (
        <ul className="space-y-4">
          {responseData.stops.map((stop: Stop, index: number) => (
            <li key={index} className="border-b pb-4 last:border-b-0">
              <h3 className="text-lg font-semibold">{stop.name}</h3>
              <p className="text-sm text-muted-foreground mb-2">
                {stop.description}
              </p>
              {/* <Badge variant={getWillingnessVariant(stop.willingness_score)}>
                  Willingness: {willingness_score}
                </Badge> */}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-muted-foreground">
          No stops to display yet. Plan your journey to see the list of stops.
        </p>
      )}
    </ScrollArea>
  );
}

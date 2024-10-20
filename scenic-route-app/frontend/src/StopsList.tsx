import { ScrollArea, ScrollBar } from "./components/ui/scroll-area";
import { motion } from "framer-motion";
import { Stop } from "./types";
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1, // Adjust as needed
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

interface StopsListProps {
  responseData: {
    stops: Stop[];
  } | null;
}

export default function StopsList({ responseData }: StopsListProps) {
  return (
    <ScrollArea className="h-96 w-full">
      {responseData?.stops ? (
        <motion.ul
          className="flex flex-col space-y-4 h-full "
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {responseData.stops.map((stop: Stop, index: number) => (
            <motion.li
              key={index}
              className="border-b p-4 last:border-b-0 h-1/3 w-full border border-slate-700 rounded"
              variants={itemVariants}
            >
              {" "}
              <h3 className="text-lg font-semibold">{stop.name}</h3>
              <p className="text-sm text-muted-foreground">
                {stop.description}
              </p>
              {/* <Badge variant={getWillingnessVariant(stop.willingness_score)}>
                  Willingness: {willingness_score}
                </Badge> */}
            </motion.li>
          ))}
        </motion.ul>
      ) : (
        <p className="text-center text-muted-foreground">
          No stops to display yet. Plan your journey to see the list of stops.
        </p>
      )}
      <ScrollBar orientation="vertical" />
    </ScrollArea>
  );
}

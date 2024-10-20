import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Compass, List, Car } from "lucide-react"; // Ensure you have lucide-react installed
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Button } from "./components/ui/button";

const Landing: React.FC = () => {
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
      <motion.div
        className="max-w-5xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <motion.h1
          className="text-5xl font-bold mb-6 text-center text-indigo-800"
          variants={fadeInUp}
        >
          Welcome to RoadSpice
        </motion.h1>

        <motion.p
          className="text-xl mb-12 text-center text-gray-700"
          variants={fadeInUp}
        >
          Plan your perfect road trip with ease, balancing speed and scenery for
          an unforgettable journey.
        </motion.p>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
          variants={staggerContainer}
        >
          {/* Card 1 */}
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl text-indigo-700">
                <MapPin className="mr-2 h-6 w-6 text-indigo-700" />
                Customized Routes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Input your start and end points, and let our app generate the
                perfect route tailored to your preferences.
              </p>
            </CardContent>
          </Card>

          {/* Card 2 */}
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl text-indigo-700">
                <Compass className="mr-2 h-6 w-6 text-indigo-700" />
                Balance Speed and Scenery
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Adjust your journey to focus on faster routes or scenic detours,
                finding the perfect balance for your trip.
              </p>
            </CardContent>
          </Card>

          {/* Card 3 */}
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl text-indigo-700">
                <List className="mr-2 h-6 w-6 text-indigo-700" />
                Curated Stops
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Discover interesting locations along your route, from popular
                attractions to hidden gems.
              </p>
            </CardContent>
          </Card>

          {/* Card 4 */}
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl text-indigo-700">
                <Car className="mr-2 h-6 w-6 text-indigo-700" />
                Easy Trip Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                View your entire journey at a glance with an interactive map and
                a detailed list of stops.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div className="text-center" variants={fadeInUp}>
          <Link to="/home">
            <Button
              size="lg"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-md shadow-md"
              aria-label="Start Planning Your Trip"
            >
              Start Planning Your Trip
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Landing;

import gemeni from '../config/gemeniConfig'

async function getEndpoints(endpoints) {
    try {
        setLoading(true);
  
        const result = await model.generateContent(
          `Hello! I am traveling from ${departureCity}, ${departureState} to ${arrivalCity}, ${arrivalState} by car. Please provide a the city's information, each with a short description, formatted as JSON. Use the following structure:
  
          {
            "start": {
              "name": "Stop Name",
              "description": "Description of the stop.",
              "coordinates": {
                  "lat": number,
                  "long": number
              }
            },
            "finish": {
              "name": "Stop Name",
              "description": "Description of the stop.",
              "coordinates": {
                  "lat": number,
                  "long": number
              }
            }
          
          Please provide only the JSON output without additional text. Avoid adding any text before the first curly brace of the json and any text after the last curly brace of the json`
        );
  
        const response = result.response.text();
        console.log(response);
        try {
          const jsonContent = response.replace(/`/g, "").trim();
          console.log(jsonContent);
          const data = JSON.parse(jsonContent);
  
          return data;
        } catch (e) {
          console.log(e);
        }
      } catch (error) {
        console.error("Failed to parse response:", error);
      } finally {
        setLoading(false);
      }
}

module.exports = getEndpoints;
export interface ResponseData {
    start: {
      name: string,
      state: string,
      description: string,
      coordinates: {
          lat: number,
          long: number
      }
    },
    finish: {
      name: string,
      state: string,
      description: string,
      coordinates: {
          lat: number,
          long: number
      }
    },
    stops: Stop[],
    travelTime: number,
    directTime:  number
}
export interface Stop {
  name: string;
  state: string;
  description: string;
  coordinates: {
      lat: number;
      long: number;
  };
}
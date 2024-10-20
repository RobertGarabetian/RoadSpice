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
    travel_time: number,
    direct_time:  number
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
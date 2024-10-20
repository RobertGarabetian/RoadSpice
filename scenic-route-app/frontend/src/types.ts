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
    stops: Stop[]
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
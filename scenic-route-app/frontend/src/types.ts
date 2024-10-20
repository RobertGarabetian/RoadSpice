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
    stops: [
      {
        name: string,
        state: string,
        description: string,
        coordinates: {
          lat: number,
          long: number
      }
      },
    ]
}
export interface ResponseData {
    stops: [
    {
        name: string,
        state: string,
        description: string,
        coordinates: {
          lat: number,
          long: number
      }
    },
];
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
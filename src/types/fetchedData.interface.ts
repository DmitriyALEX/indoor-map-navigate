interface ICoordinates {
  x: number;
  y: number;
}

export interface IfetchedData {
  id: number;
  title: string;
  coordinates: ICoordinates;
}

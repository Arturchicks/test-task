type LocationIdType = {
  name: string;
  locationID: number;
};
type EnvIdType = {
  name: string;
  environmentID: number;
};
export type Option = LocationIdType | EnvIdType;

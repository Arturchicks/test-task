import { Dispatch, SetStateAction } from "react";
import { Environment, Location } from "../../../store/useLocationsStore";

export type OptionsProps = {
  locations: Location[];
  environments: Environment[];
  setEnvId: Dispatch<SetStateAction<number>>;
  setLocationId: Dispatch<SetStateAction<number>>;
};

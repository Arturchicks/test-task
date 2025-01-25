import Select from "../../../ui/select/select";
import { OptionsProps } from "./types";

const Options: React.FC<OptionsProps> = ({
  locations,
  environments,
  setEnvId,
  setLocationId,
}) => {
  return (
    <>
      <span>Локация</span>
      <Select
        options={locations}
        setEnvId={setEnvId}
        setLocationId={setLocationId}
      />
      <span>Среда</span>
      <Select
        options={environments}
        setEnvId={setEnvId}
        setLocationId={setLocationId}
      />
    </>
  );
};
export default Options;

import { useEffect, useState } from "react";
import { Location, useLocationsStore } from "./store/useLocationsStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faLocation,
  faLocationDot,
  faServer,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import Select from "./select";
export default function App() {
  return (
    <div className="App">
      <TestLocationsList />
    </div>
  );
}

const TestLocationsList = () => {
  const [locationsList, setLocationsList] = useState<Partial<Location>[]>([{}]);
  return (
    <>
      {locationsList.map((_location, index) => (
        <TestLocationForm key={`location-${index}`} />
      ))}
      <button
        type="button"
        onClick={() => {
          setLocationsList((locationsList) => [...locationsList, {}]);
        }}
      >
        Добавить тестовую локацию
      </button>
      <button
        onClick={() => {
          console.log(locationsList);
        }}
      >
        Вывести результат в консоль
      </button>
    </>
  );
};

const TestLocationForm = () => {
  library.add(faServer);
  const { environments, fetch, isLoaded, locations, servers } =
    useLocationsStore();
  const [locId, setLocationId] = useState<number | undefined>(1);
  const [envId, setEnvId] = useState<number | undefined>(1);

  useEffect(() => {
    fetch();
  }, []);

  if (!isLoaded) return <div>Данные не загружены</div>;

  return (
    <div className="location-container">
      <span>Локация</span>
      <Select
        options={locations}
        type="location"
        setEnvId={setEnvId}
        setLocationId={setLocationId}
      />
      <span>Среда</span>
      <Select
        options={environments}
        type="environment"
        setEnvId={setEnvId}
        setLocationId={setLocationId}
      />
      <div className="server-container">
        <span>Серверы</span>
        <FontAwesomeIcon icon="server" />
        {servers
          .filter(
            ({ locationID, environmentID }) =>
              locationID === locId && environmentID === envId,
          )
          .map((e, i, arr) => (
            <span key={e.serverID} className="display">
              {e.name}
              {i !== arr.length - 1 && ", "}
            </span>
          ))}
      </div>
    </div>
  );
};

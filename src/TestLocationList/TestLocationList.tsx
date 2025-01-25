import { useCallback, useState } from "react";

import { faPlus, faTerminal } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import TestLocationForm from "../TestLocationForm/TestLocationForm";
import { Environment, Location } from "../store/useLocationsStore";
import Button from "../ui/button";
import { newObjectType } from "./types";

library.add(faPlus, faTerminal);

const TestLocationsList = () => {
  const [locationsList, setLocationsList] = useState<
    Map<number, Required<Location & Environment & { hint: string }>>
  >(new Map());

  const handleDelete = useCallback((id: number) => {
    setLocationsList((prev) => {
      const newMap = new Map(prev);
      newMap.delete(id);
      return newMap;
    });
  }, []);

  const handleAdd = useCallback(() => {
    setLocationsList((prev) => {
      const keys = Array.from(prev.keys());
      const id = keys.length ? keys[keys.length - 1] + 1 : 1;
      const newMap = new Map(prev);
      newMap.set(id, {
        locationID: 1,
        name: `location-${id}`,
        environmentID: 1,
        hint: "",
      });
      return newMap;
    });
  }, []);

  const handleChange = useCallback((id: number, obj: newObjectType) => {
    setLocationsList((prev) => {
      const newMap = new Map(prev);
      if (prev.has(id)) {
        const el = prev.get(id);
        if (el) newMap.set(id, { ...obj, name: el.name });
      }
      return newMap;
    });
  }, []);

  const handleConsole = () =>
    console.log(
      Array.from(locationsList.values()).map(({ name, ...el }) => el),
    );

  return (
    <div className="container fade-in" style={{ flexDirection: "column" }}>
      {!locationsList.size ? (
        <div className="article-container">
          <FontAwesomeIcon icon="location-dot" size="3x" />
          <h3>Добавьте локацию</h3>
        </div>
      ) : (
        Array.from(locationsList.keys()).map((id) => (
          <TestLocationForm
            key={`location-${id}`}
            id={id}
            handleDelete={handleDelete}
            handleChange={handleChange}
          />
        ))
      )}
      <div className="btn-group">
        <Button
          handleClick={handleAdd}
          className={
            locationsList.size ? "add-btn slide-btn" : "add-btn slide-btn-back"
          }
        >
          <FontAwesomeIcon icon="plus" size="lg" />
          Добавить тестовую локацию
        </Button>
        <Button
          handleClick={handleConsole}
          isDisabled={!Boolean(locationsList.size)}
        >
          <FontAwesomeIcon icon="terminal" />
          Вывести результат в консоль
        </Button>
      </div>
    </div>
  );
};

export default TestLocationsList;

import { useState, useEffect, memo, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faServer,
  faVial,
  faTrashCan,
  faSpinner,
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";

import classnames from "classnames";

import Button from "../ui/button";
import { useLocationsStore } from "../store/useLocationsStore";
import Servers from "./servers/servers";
import Options from "./sections/options/options";
import Hint from "./sections/hint/hint";
import { newObjectType } from "../TestLocationList/types";

library.add(faServer, faVial, faTrashCan, faSpinner, faQuestion);

const TestLocationForm: React.FC<{
  handleDelete: (id: number) => void;
  id: number;
  handleChange: (id: number, obj: newObjectType) => void;
}> = memo(({ handleDelete, handleChange, id }) => {
  const { environments, fetch, locations, servers } = useLocationsStore();
  const [locID, setLocationId] = useState<number>(1);
  const [envID, setEnvId] = useState<number>(1);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [onDelete, setOnDelete] = useState<boolean>(false);
  const [hint, setHint] = useState<string>("");
  const classContainer = classnames("location-container", {
    "fade-in": !onDelete,
    "fade-out": onDelete,
  });
  const hintRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    fetch()
      .then(() => setIsLoaded(true))
      .catch(({ message }) => console.error(message));
  }, []);

  useEffect(() => {
    const newObj = {
      locationID: locID,
      environmentID: envID,
      hint,
    };
    handleChange(id, newObj);
  }, [locID, envID, hint]);

  if (!isLoaded) return <FontAwesomeIcon icon="spinner" className="spinner" />;

  return (
    <div
      className={classContainer}
      onAnimationEnd={({ animationName }) => {
        if (animationName === "fade-out") handleDelete(id);
      }}
    >
      <section className="top-section">
        <article className="article-container">
          <FontAwesomeIcon icon="vial" size="lg" />
          <h3>Тестовая локация {id}</h3>
        </article>
        <Button handleClick={() => setOnDelete(true)} className="delete-btn">
          <FontAwesomeIcon icon="trash-can" size="lg" />
        </Button>
      </section>
      <section className="low-section">
        <Options
          {...{
            locations,
            environments,
            setEnvId,
            setLocationId,
          }}
        />
        <Servers servers={servers} ids={{ locID, envID }} />
        <Hint ref={hintRef} setHint={setHint} />
      </section>
    </div>
  );
});

export default TestLocationForm;

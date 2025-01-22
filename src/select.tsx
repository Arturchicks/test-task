import { Dispatch, SetStateAction, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
library.add(faCaretDown, faLocationDot);

interface Option {
  name: string;
  environmentID?: number;
  locationID?: number;
}
type OptionType = "location" | "environment";

const Select: React.FC<{
  options: Option[];
  type: OptionType;
  setLocationId: Dispatch<SetStateAction<number | undefined>>;
  setEnvId: Dispatch<SetStateAction<number | undefined>>;
}> = ({ options, type, setEnvId, setLocationId }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const [option, setOption] = useState<Option>(options[0]);
  const selectRef = useRef<HTMLDivElement | null>(null);

  const handleClick = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    option: Option,
  ) => {
    e.stopPropagation();
    setOpen(false);
    setOption(option);
    if (type === "environment") {
      setEnvId(option.environmentID);
    } else setLocationId(option.locationID);
  };

  const handleOpen = () => {
    setOpen((prev) => !prev);
    setIsDirty(true);
    if (selectRef.current) {
      const height = options.length * 25;
      selectRef.current.style.setProperty("--height", `${height}px`);
    }
  };

  return (
    <div
      className={open ? "select open" : isDirty ? "select close" : "select"}
      onClick={handleOpen}
      ref={selectRef}
    >
      <FontAwesomeIcon icon="location-dot" className="location-dot" />
      <span className="current-location">{option.name}</span>
      <ul className="list">
        {open &&
          options
            .filter((el) => el !== option)
            .map((el: Option) => (
              <li
                key={type === "location" ? el.locationID : el.environmentID}
                onClick={(event) => handleClick(event, el)}
                className="list-item"
              >
                {el.name}
              </li>
            ))}
      </ul>
      <FontAwesomeIcon icon="caret-down" className="caret-down" />
    </div>
  );
};
export default Select;

import { Dispatch, SetStateAction, useCallback, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faEnvira } from "@fortawesome/free-brands-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import classNames from "classnames";

import { Option } from "./types";

library.add(faCaretDown, faLocationDot, faEnvira);

const Select: React.FC<{
  options: Option[];
  setLocationId: Dispatch<SetStateAction<number>>;
  setEnvId: Dispatch<SetStateAction<number>>;
}> = ({ options, setEnvId, setLocationId }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const [option, setOption] = useState(options[0]);
  const selectRef = useRef<HTMLDivElement | null>(null);
  const classContainer = classNames("select", {
    open: open,
    close: !open && isDirty,
  });
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLLIElement, MouseEvent>, option: Option) => {
      e.stopPropagation();
      setOpen(false);
      setOption(option);
      if ("environmentID" in option) {
        setEnvId(option.environmentID);
      } else setLocationId(option.locationID);
    },
    [],
  );
  const handleOpen = useCallback(() => {
    setOpen((prev) => !prev);
    setIsDirty(true);
    if (selectRef.current) {
      const height =
        options.length > 2 ? options.length * 25 : options.length * 26;
      selectRef.current.style.setProperty("--height", `${height}px`);
    }
  }, []);

  return (
    <div className={classContainer} onClick={handleOpen} ref={selectRef}>
      <FontAwesomeIcon
        icon={
          "environmentID" in option
            ? ["fab", "envira"]
            : ["fas", "location-dot"]
        }
        className="location-dot"
      />
      <span className="current-location">{option.name}</span>
      <ul className="list">
        {open &&
          options
            .filter((el) => el !== option)
            .map((el: Option) => (
              <li
                key={"locationID" in el ? el.locationID : el.environmentID}
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

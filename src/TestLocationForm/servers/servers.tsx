import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Server } from "../../store/useLocationsStore";
import { Ids } from "./types";

const Servers: React.FC<{ servers: Server[]; ids: Ids }> = ({
  servers,
  ids,
}) => {
  return (
    <div className="server-container">
      <span>Серверы</span>
      <FontAwesomeIcon icon="server" />
      {servers
        .filter(
          ({ locationID, environmentID }) =>
            locationID === ids.locID && environmentID === ids.envID,
        )
        .map((e, i, arr) => (
          <span key={e.serverID} className="fade-in">
            {e.name}
            {i !== arr.length - 1 && ", "}
          </span>
        ))}
    </div>
  );
};
export default Servers;

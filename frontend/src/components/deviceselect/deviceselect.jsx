import "./deviceselect.css";

function DeviceSelect({ apiEndpoint, setApiEndpoint }) {
  return (
    <fieldset className="rounded-container device-container">
      <legend htmlFor="device-endpoint" className="textbox-title">
        Device Endpoint
      </legend>
      <input
        type="text"
        id="device-endpoint"
        name="device-endpoint"
        onChange={(e) => setApiEndpoint(e.target.value)}
      ></input>
    </fieldset>
  );
}

export default DeviceSelect;

import "./deviceselect.css";

function DeviceSelect({ apiEndpoint, setApiEndpoint }) {
  return (
    <div className="rounded-container device-container">
      <label htmlFor="device-endpoint" className="textbox-title">
        Device Endpoint
      </label>
      <input
        type="text"
        id="device-endpoint"
        name="device-endpoint"
        onChange={(e) => setApiEndpoint(e.target.value)}
      ></input>
    </div>
  );
}

export default DeviceSelect;

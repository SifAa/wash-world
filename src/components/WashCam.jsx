import React, { useEffect, useState } from "react";
import axios from "axios";
import info from "../info";

export default function WashCam(data) {
  const [lpn, setLpn] = useState("");

  useEffect(() => {
    if (data.locationID !== 0) {
      axios.get(info.backendUrl + "/cam/" + data.locationID).then((result) => {
        //console.log(result.data.response.lpn);
        setLpn(getRandomLPN(result.data.response.lpn));
      });
    }
  }, [data.locationID]);

  function getRandomLPN(lpn) {
    const chars = lpn.slice(0, 2);
    const numbers = lpn.slice(2) - Math.round(Math.random() * 1);
    return chars + numbers;
  }

  function confirmLpn() {
    data.setLPN(lpn);
  }

  return (
    <div className="cam-container">
      <h2>Bekræft din nummerplade</h2>
      {lpn === "" && (
        <div className="lds-default">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
      <p className="lpn">{lpn}</p>
      <button className="btn btn-wash" onClick={confirmLpn}>
        Bekræft
      </button>
    </div>
  );

  //Spinner if lpn is empty
}

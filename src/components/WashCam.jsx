import React, { useEffect, useState } from "react";
import axios from "axios";
import info from "../info";

export default function WashCam(data) {
  const [backendLpn, setBackendLpn] = useState({});

  useEffect(() => {
    axios.get(info.backendUrl + "/cam/" + data.LocationID).then((result) => {
      //console.log(result.data);
      setBackendLpn(result.data); // everytime i tried getting it more precise like adding .response it gave me undefined, I do not know how to get the lpn from this
    });
  }, []);

  function getRandomLPN(lpn) {
    const chars = lpn.slice(0, 2);
    const numbers = lpn.slice(2) - Math.round(Math.random() * 1);
    return chars + numbers;
  }

  //console.log(getRandomLPN("BV99123"));

  const lpn = getRandomLPN("BV99123");

  function confirmLpn() {
    data.setLPN(lpn);
  }

  return (
    <div>
      <h2>Bekræft din nummerplade</h2>
      <h5>{lpn}</h5>
      <button className="btn btn-wash" onClick={confirmLpn}>
        Bekræft
      </button>
    </div>
  );
}

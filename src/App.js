import React, { useEffect, useState } from "react";
import axios from "axios";
import info from "./info";
import styles from "./styles.css";
import WashLocation from "./components/WashLocation";
import Navbar from "./components/Navbar";
import WashProducts from "./components/WashProducts";
import WashCam from "./components/WashCam";
import WashStatus from "./components/WashStatus";

function App() {
  const [locations, setLocations] = useState([]);
  const [locationID, setLocationID] = useState(0);

  useEffect(() => {
    //bruger promises i useEffect for nemhedens skyld
    // den funkion useEffect bruger godtager ikke async
    axios.get(info.backendUrl + "/locations").then((result) => {
      // console.log(result.data.response.locations);
      setLocations(result.data.response.locations);
    });
  }, []);

  function locationClicked(event) {
    setLocationID(event.target.value);
    setCamLoad(true);
  }

  const [lpn, setLPN] = useState({});
  const [camLoad, setCamLoad] = useState(false);

  const [products, setProducts] = useState([]);
  const [programID, setProgramID] = useState(0);

  function chooseWash(event) {
    setProgramID(event.target.value);
  }

  return (
    <div>
      {/* {console.log(Object.keys(cam).length)} */}
      <Navbar />
      <main className="container">
        {locations.length > 0 &&
          locationID === 0 &&
          //cam.length == 0 &&
          locations.map((location) => {
            return (
              <WashLocation
                key={location.id}
                location={location}
                locationClicked={locationClicked}
              />
            );
          })}
        {locationID !== 0 && Object.keys(lpn).length === 0 && (
          <WashCam
            locationID={locationID}
            setLPN={setLPN}
            lpn={lpn}
            setCamLoad={setCamLoad}
            camLoad={camLoad}
          />
        )}
        {Object.keys(lpn).length > 0 && programID === 0 && (
          <WashProducts
            locationID={locationID}
            products={products}
            setProducts={setProducts}
            programID={programID}
            setProgramID={setProgramID}
            lpn={lpn}
            chooseWash={chooseWash}
          />
        )}
        {programID !== 0 && (
          <WashStatus locationID={locationID} programID={programID} />
        )}
      </main>
    </div>
  );
}

export default App;

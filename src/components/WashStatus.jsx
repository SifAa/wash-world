import React, { useEffect } from "react";
import axios from "axios";
import info from "../info";

export default function WashStatus(data) {
  useEffect(() => {
    axios
      .post(
        info.backendUrl + "/" + data.locationID + "/start/" + data.programID
      )
      .then((result) => {
        //console.log(result.data.response);
        data.setProgram(result.data.response);
      });
  }, []);

  //var counter = document.getElementById("cycleTimer");

  var duration = data.program.estimated_duration;

  if (duration) {
    var durationArray = duration.split(":");
    var minutes = durationArray[0];
    var seconds = durationArray[1];
    document.getElementById("timer").innerHTML = minutes + ":" + seconds;
    startTimer();
  }

  function startTimer() {
    var presentTime = document.getElementById("timer").innerHTML;
    var timeArray = presentTime.split(/[:]+/);
    var m = timeArray[0];
    var s = checkSecond(timeArray[1] - 1);
    if (s == 59) {
      m = m - 1;
    }
    if (m < 0) {
      return;
    }

    document.getElementById("timer").innerHTML = m + ":" + s;
    setTimeout(startTimer, 1000);
  }

  function checkSecond(sec) {
    if (sec < 10 && sec >= 0) {
      sec = "0" + sec;
    } // add zero in front of numbers < 10
    if (sec < 0) {
      sec = "59";
    }
    return sec;
  }

  return (
    <div className="program-container">
      {Object.keys(data.program).length === 0 && (
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
      <h2>{data.program.program}</h2>
      <div id="cycleTimer">
        <span id="timer"></span>
      </div>
    </div>
  );
}

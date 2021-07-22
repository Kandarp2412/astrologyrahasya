import React, { useContext, useState } from "react";
import { Card } from "reactstrap";
import { globalContext } from "../../contexts/Context";
// import AppContext, { globalContext } from "../../context/Context";
// import CardSummary from "../dashboard/CardSummary";
import BirthChartSVG from "./BirthChartSVG";
import NorthIndianStyle from "./NorthIndianStyle";

function AnotherCharts() {
  const { data, color, chartType } = useContext(globalContext);
  // const { isDark } = useContext(AppContext);
  const [d7Chart, setD7Chart] = useState(["d7Chart"]);
  const [anotherCharts, setAnotherCharts] = useState(["d7Chart"]);
  const [secondVargaChart, setSecondVargaChart] = useState(["d9Chart"]);
  const [thirdVargaChart, setThirdVargaChart] = useState(["d10Chart"]);

  const handleFirstVargaChart = (e) => {
    console.log(e.target.value);
    setAnotherCharts(e.target.value);
  };

  const handleSecondVargaChart = (e) => {
    setSecondVargaChart(e.target.value);
  };

  const handleThirdVargaChart = (e) => {
    setThirdVargaChart(e.target.value);
  };

  return (
    <div>
      <div className="row">
        <div className="col-sm-4">
          <div style={{ marginTop: "20px" }}>
            <input
              list="firstchart"
              onClick={(e) => handleFirstVargaChart(e)}
              style={{ marginBottom: "10px", width: "23vw", minWidth: "18rem" }}
              defaultValue="d7Chart"
            />
            <datalist id="firstchart">
              <option>d1Chart</option>
              <option>d2Chart</option>
              <option>d3Chart</option>
              <option>d4Chart</option>
              <option>d5Chart</option>
              <option>d7Chart</option>
              <option>d8Chart</option>
              <option>d9Chart</option>
              <option>d10Chart</option>
              <option>d12Chart</option>
              <option>d16Chart</option>
              <option>d20Chart</option>
              <option>d24Chart</option>
              <option>d27Chart</option>
              <option>d30Chart</option>
              <option>d40Chart</option>
              <option>d45Chart</option>
              <option>d60Chart</option>
            </datalist>
            <div
              style={{
                height: "23vw",
                width: "23vw",
                minWidth: "18rem",
                minHeight: "18rem",
                marginBottom: "30px",
                border: "2px solid #726F5F",
                fontSize: "16px",
                backgroundColor: "#FAF7D2",
              }}
            >
              {data &&
                (chartType === "North Indian" ? (
                  <NorthIndianStyle data={data?.charts[anotherCharts]} />
                ) : (
                  <BirthChartSVG data={data?.charts[anotherCharts]} />
                ))}
              <h5>{anotherCharts}</h5>
            </div>
          </div>
        </div>
        {data && (
          <div className="col-sm-4">
            <div style={{ marginTop: "20px" }}>
              <input
                list="secondchart"
                onClick={(e) => handleSecondVargaChart(e)}
                style={{
                  // marginLeft: "15px",
                  marginBottom: "10px",
                  width: "23vw",
                  minWidth: "18rem",
                }}
                defaultValue="d9Chart"
              />
              <datalist id="secondchart">
                <option>d1Chart</option>
                <option>d2Chart</option>
                <option>d3Chart</option>
                <option>d4Chart</option>
                <option>d5Chart</option>
                <option>d7Chart</option>
                <option>d8Chart</option>
                <option>d9Chart</option>
                <option>d10Chart</option>
                <option>d12Chart</option>
                <option>d16Chart</option>
                <option>d20Chart</option>
                <option>d24Chart</option>
                <option>d27Chart</option>
                <option>d30Chart</option>
                <option>d40Chart</option>
                <option>d45Chart</option>
                <option>d60Chart</option>
              </datalist>
              <div
                style={{
                  height: "23vw",
                  width: "23vw",
                  minWidth: "18rem",
                  minHeight: "18rem",
                  marginBottom: "30px",
                  border: "2px solid #726F5F",
                  fontSize: "16px",
                  backgroundColor: "#FAF7D2",
                }}
              >
                {data &&
                  (chartType === "North Indian" ? (
                    <NorthIndianStyle data={data?.charts[secondVargaChart]} />
                  ) : (
                    <BirthChartSVG data={data?.charts[secondVargaChart]} />
                  ))}
                <h5>{secondVargaChart}</h5>
              </div>
            </div>
          </div>
        )}
        {data && (
          <div className="col-sm-4">
            <div style={{ marginTop: "20px" }}>
              <input
                list="thirdchart"
                onClick={(e) => handleThirdVargaChart(e)}
                style={{
                  // marginLeft: "15px",
                  marginBottom: "10px",
                  width: "23vw",
                  minWidth: "18rem",
                  // minWidth:""
                }}
                defaultValue="d10Chart"
              />
              <datalist id="thirdchart">
                <option>d1Chart</option>
                <option>d2Chart</option>
                <option>d3Chart</option>
                <option>d4Chart</option>
                <option>d5Chart</option>
                <option>d7Chart</option>
                <option>d8Chart</option>
                <option>d9Chart</option>
                <option>d10Chart</option>
                <option>d12Chart</option>
                <option>d16Chart</option>
                <option>d20Chart</option>
                <option>d24Chart</option>
                <option>d27Chart</option>
                <option>d30Chart</option>
                <option>d40Chart</option>
                <option>d45Chart</option>
                <option>d60Chart</option>
              </datalist>
              {/* </input> */}
              {/* <h2>{key}</h2> */}
              <div
                style={{
                  height: "23vw",
                  width: "23vw",
                  minWidth: "18rem",
                  minHeight: "18rem",
                  marginBottom: "30px",
                  border: "2px solid #726F5F",
                  fontSize: "16px",
                  // minWidth: "30rem",
                  // maxWidth: "35rem",
                  // maxHeight: "35rem",
                  // minHeight: "30rem",
                  backgroundColor: "#FAF7D2",
                  // padding: "10px",
                  // boxShadow: "rgb(178 121 75) 0px 0px 15px",
                }}
              >
                {data &&
                  (chartType === "North Indian" ? (
                    <NorthIndianStyle data={data?.charts[thirdVargaChart]} />
                  ) : (
                    <BirthChartSVG data={data?.charts[thirdVargaChart]} />
                  ))}
                <h5>{thirdVargaChart}</h5>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AnotherCharts;

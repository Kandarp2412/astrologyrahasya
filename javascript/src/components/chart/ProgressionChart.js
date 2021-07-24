// import { Divider } from "@chakra-ui/layout";
// import { Select } from "@chakra-ui/select";
import axios from "axios";
import moment from "moment";
import React, { useContext, useState } from "react";
import { globalContext } from "../../contexts/Context";
// import AppContext, { globalContext } from "../../context/Context";
import BirthChartSVG from "./BirthChartSVG";
import NorthIndianStyle from "./NorthIndianStyle";
// import { globalContext } from "";
// import BirthChartSVG from '../BirthChartSVG';

function ProgressionChart() {
  const {
    data,
    formData,
    setData,
    selectedAyanamsha,
    progressionChart,
    setProgressionChart,
    transitChart,
    setTransitChart,
    selectedCharts,
    setSelectedCharts,
    anotherCharts,
    setAnotherCharts,
    equation,
    addDate,
    transitionDate,
    setTransitionDate,
    progrestionDate,
    setProgressionDate,
    date,
    setDate,
    chartType,
  } = useContext(globalContext);

  // const { isDark } = useContext(AppContext);
  // const [progressionChart, setProgressionChart] = useState(formData.birthDate);
  // const [transitChart, setTransitChart] = useState({});
  // const [selectedCharts, setSelectedCharts] = useState(["d1Chart"]);
  // const [anotherCharts, setAnotherCharts] = useState([
  //   "d7Chart",
  //   "d9Chart",
  //   "d10Chart",
  //   "d60Chart",
  // ]);
  // const [date, setDate] = useState(0);

  // const equation = moment(formData.birthDate).format("yyyy");

  // const addDate = moment(formData.birthDate).format("DD");

  // const [transitionDate, setTransitionDate] = useState(equation);

  // const [progrestionDate, setProgressionDate] = useState(addDate);

  const handleDate = (e) => {
    axios
      .post("http://localhost:9002/api/getprogressionChart", {
        dateString: finalProgressionDate,
        timeString: formData.birthTime,
        lat: formData.latitude,
        lng: formData.longitude,
        ayanamsha: selectedAyanamsha,
      })
      .then((result) => {
        console.log(data.dasha);
        setProgressionChart(result.data.charts);
      });

    axios
      .post("http://localhost:9002/api/gettransitChart", {
        dateString: finalTransitDate,
        timeString: formData.birthTime,
        lat: formData.latitude,
        lng: formData.longitude,
        ayanamsha: selectedAyanamsha,
      })
      .then((result) => {
        console.log(result.data.charts.d1Chart);
        setTransitChart(result.data.charts);
      });

    setProgressionDate(parseInt(addDate) + parseInt(date));
    console.log(progrestionDate);
    setDate(parseInt(e.target.value - equation));

    setTransitionDate(e.target.value);
    console.log(transitionDate);
  };

  let finalTransitDate = moment(formData.birthDate).format("DD-MM-") + transitionDate;

  let finalProgressionDate = progrestionDate + moment(formData.birthDate).format("-MM-YYYY");

  if (date === 0) {
    finalProgressionDate = formData.birthDate;
    finalTransitDate = formData.birthDate;
  }
  return (
    <div>
      {data &&
        selectedCharts &&
        selectedCharts.map((key) => {
          return (
            <div key={key}>
              {/* <div className="col-sm-12"> */}
              {/* <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ textAlign: "justify" }}>
                    <h5>Progression Chart</h5>
                    <p style={{ fontSize: "12px" }}>
                      DATE - {finalProgressionDate} AGE-
                      {date}
                    </p>
                  </div>
                  <div>
                    <Select
                      onClick={(e) => handleDate(e)}
                      style={{
                        width: "100px",
                        height: "30px",
                        fontSize: "12px",
                      }}
                    >
                     
                      <option>
                       
                        {equation}
                      </option>
                      <option>2022</option>
                      <option>2023</option>
                      <option>2024</option>
                      <option>2025</option>
                      <option>2026</option>
                    </Select>
                  </div>
                </div>
                <Divider
                  style={{
                    border: "1px solid grey",
                    marginBottom: "10px",
                    marginTop: "5px",
                  }}
                /> */}
              <div
                style={{
                  height: "22vw",
                  width: "22vw",
                  minWidth: "18rem",
                  minHeight: "18rem",
                  // marginBottom: "30px",
                  border: "2px solid #726F5F",
                  display: "flex",
                  justifyContent: "flex",
                  marginTop: "-15px",
                  marginLeft: "-35px",
                  // marginBottom: "-28px",
                  // marginRight: "-35px",
                  // marginLeft: "-15px",
                  backgroundColor: "#FAF7D2",
                  // padding: "10px",
                  // boxShadow: "rgb(178 121 75) 0px 0px 15px",
                }}
              >
                {data && progressionChart ? (
                  chartType === "North Indian" ? (
                    <NorthIndianStyle
                      data={progressionChart?.["d1Chart"]}
                      selectedCharts={selectedCharts}
                    />
                  ) : data ? (
                    <BirthChartSVG
                      data={progressionChart?.["d1Chart"]}
                      selectedCharts={selectedCharts}
                    />
                  ) : chartType === "North Indian" ? (
                    data && (
                      <NorthIndianStyle
                        data={data?.charts["d1Chart"]}
                        selectedCharts={selectedCharts}
                      />
                    )
                  ) : (
                    <BirthChartSVG data={data?.charts["d1Chart"]} selectedCharts={selectedCharts} />
                  )
                ) : null}

                {/* (
                    chartType === "North indian" ? (
                      <NorthIndianStyle
                        data={progressionChart?.["d1Chart"]}
                        selectedCharts={selectedCharts}
                      />
                    ) : data ? (
                      <NorthIndianStyle
                        data={data?.charts["d1Chart"]}
                        selectedCharts={selectedCharts}
                      />
                    ) : */}
                {/* {data && (
                    progressionChart && (
                      <BirthChartSVG
                        data={progressionChart?.["d1Chart"]}
                        selectedCharts={selectedCharts}
                      />
                    ) 
                  ) : data ? (
                    // <h2>iuty</h2>
                    <BirthChartSVG
                      data={data?.charts["d1Chart"]}
                      selectedCharts={selectedCharts}
                    />
                  ) : null} */}
              </div>
              {/* </div> */}
            </div>
          );
        })}
    </div>
  );
}

export default ProgressionChart;

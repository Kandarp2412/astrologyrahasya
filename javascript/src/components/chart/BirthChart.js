// import { Divider } from "@chakra-ui/layout";
// import { Select } from "@chakra-ui/select";
import axios from "axios";
import moment from "moment";
import React, { useContext, useState } from "react";
import { globalContext } from "../../contexts/Context";
// import AppContext, { globalContext } from "../../context/Context";
import BirthChartSVG from "./BirthChartSVG";
import NorthIndianStyle from "./NorthIndianStyle";
import PropTypes from "prop-types";
import { Autocomplete, Divider, TextField } from "@material-ui/core";
import Toggle from "react-toggle";
import "./Toggle.css";

// import { globalContext } from "";
// import BirthChartSVG from '../BirthChartSVG';

function BirthChart(props) {
  // const { color } = props;
  const { data, formData, setData, selectedAyanamsha, chartType, toggleTrue, setToggleTrue } =
    useContext(globalContext);
  // const { isDark } = useContext(AppContext);
  const [progressionChart, setProgressionChart] = useState(formData.birthDate);
  const [transitChart, setTransitChart] = useState({});
  const [selectedCharts, setSelectedCharts] = useState(["d1Chart"]);

  const [date, setDate] = useState(0);

  const equation = moment(formData.birthDate).format("yyyy");

  const addDate = moment(formData.birthDate).format("DD");

  const [transitionDate, setTransitionDate] = useState(equation);

  const [progrestionDate, setProgressionDate] = useState(addDate);
  const [chartsShow, setChartsShow] = useState("d1Chart");

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

  const handleToggle = () => {
    // console.log(toggleTrue);
    setToggleTrue(!toggleTrue);
    // console.log(toggleTrue);
  };

  const top100Films = [
    { title: "Birth Chart" },
    { title: "Sun Chart" },
    { title: "Moon Chart" },
    { title: "Chalit Chart" },
    { title: "Hora Chart" },
    { title: "Dreshkan Chart" },
    { title: "Chathurthamasha Chart" },
    { title: "Panchmansha Chart" },
    { title: "Saptamansha Chart" },
    { title: "Ashtamansha Chart" },
    { title: "Navamansha Chart" },
    { title: "Dashamansha Chart" },
    { title: "Dwadashamsha Chart" },
    { title: "Shodashamsha Chart" },
    { title: "Vishmansha Chart" },
    { title: "Chaturvimshamsha Chart" },
    { title: "Bhamsha" },
    { title: "Trishamansha Chart" },
    { title: "Khavedamansha Chart" },
    { title: "Akshvedamsha Chart" },
    { title: "Shashtymasha Chart" },
  ];

  // const handleCharts = (e) => {
  //   setChartsShow(e.target.value);
  //   console.log(e.target.value);
  // };

  return (
    <div className="row">
      {data &&
        selectedCharts &&
        selectedCharts.map((key) => {
          return (
            <div style={{ margin: "5px" }} key={key}>
              {/* <div className="col-sm-5"> */}
              {/* <h2>{key}</h2> */}
              {/* <div style={{ textAlign: "justify" }}>
                  <h5>Birth Chart</h5>
                  <p style={{ fontSize: "12px" }}>Your birth(lagna) Chart</p>
                  <Divider
                    style={{
                      border: "1px solid grey",
                      marginBottom: "10px",
                    }}
                  />
                </div> */}

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  // marginBottom: "-16px",
                }}
              >
                {/* <div>
                  <h5>Birth Chart</h5>
                  <p style={{ fontSize: "12px" }}>Your birth(lagna) Chart</p>
                </div> */}
                {/* <div> */}
                <div>
                  <Autocomplete
                    id="combo-box-demo"
                    options={top100Films}
                    getOptionLabel={(option) => option.title}
                    style={{
                      width: "220px",
                      marginTop: "15px",
                      marginLeft: "-10px",
                      marginBottom: "-15px",
                      minWidth: "10rem",
                    }}
                    hiddenLabel="true"
                    renderInput={(params) => (
                      <TextField
                        // placeholder="combo-box"
                        {...params}
                        // label=" "
                        // placeholder="abd"
                        defaultValue="d1Chart"
                        variant="outlined"
                      />
                    )}
                  />
                  {/* <input
                    list="secondchart"
                    
                    style={{
                     
                      fontSize: "14px",
                      height: "30px",
                      marginTop: "25px",
                      width: "2vw",
                      minWidth: "15rem",
                    }}
                    defaultValue="d1Chart"
                  />
                  <datalist id="secondchart">
                    <option>Birth Chart</option>
                    <option>Sun Chart</option>
                    <option>Moon Chart</option>
                    <option>Chalit Chart</option>
                    <option>Hora Chart</option>
                    <option>Dreshkan Chart</option>
                    <option>Chathurthamasha Chart</option>
                    <option>Panchmansha Chart</option>
                    <option>Saptamansha Chart</option>
                    <option>Ashtamansha Chart</option>
                    <option>Navamansha Chart</option>
                    <option>Dashamansha Chart</option>
                    <option>Dwadashamsha Chart</option>
                    <option>Shodashamsha Chart</option>
                    <option>Vishmansha Chart</option>
                    <option>Chaturvimshamsha Chart</option>
                    <option>Bhamsha</option>
                    <option>Trishamansha Chart</option>
                    <option>Khavedamansha Chart</option>
                    <option>Akshvedamsha Chart</option>
                    <option>Shashtymasha Chart</option>
                  </datalist> */}
                  {/* <label htmlFor="cheese-status" style={{ marginLeft: "5px" }}>
                    Hide Details
                  </label> */}
                </div>
                <Toggle
                  id="cheese-status"
                  // style={{ marginTop: "50px" }}
                  // defaultChecked={this.state.cheeseIsReady}
                  onClick={(e) => handleToggle(e)}
                />

                {/* </div> */}
              </div>
              <Divider
                style={{
                  border: "1px solid grey",
                  marginBottom: "10px",
                  // marginTop: "15px",
                  textAlign: "justify",
                  width: "23vw",
                  minWidth: "18rem",
                  marginLeft: "-10px",
                  // width: "450px",
                  // minWidth: "200px",
                }}
              />
              <div
                style={{
                  height: "23vw",
                  width: "23vw",
                  minWidth: "18rem",
                  minHeight: "18rem",
                  // marginBottom: "30px",
                  border: "2px solid #726F5F",
                  display: "flex",
                  justifyContent: "flex",
                  // marginTop: "-13px",
                  marginLeft: "-10px",
                  // marginBottom: "-33px",
                  marginRight: "-25px",
                  backgroundColor: "#FAF7D2",
                  // padding: "10px",
                  // boxShadow: "rgb(178 121 75) 0px 0px 15px",
                }}
              >
                {data &&
                  (chartType === "North Indian" ? (
                    <NorthIndianStyle
                      data={data?.charts["d1Chart"]}
                      selectedCharts={selectedCharts}
                    />
                  ) : (
                    <BirthChartSVG data={data?.charts["d1Chart"]} selectedCharts={selectedCharts} />
                  ))}
              </div>
              {/* </div> */}
            </div>
          );
        })}
    </div>
  );
}

BirthChart.propTypes = {
  color: PropTypes.node.isRequired,
};

export default BirthChart;

import React, { Fragment, useContext, useEffect, useState } from "react";
import { Row, Col, Card, CardBody, Button, InputGroup, CustomInput } from "reactstrap";
// import CountUp from "react-countup";
import CardSummary from "./CardSummary";
// import ActiveUsersBarChart from "./ActiveUsersBarChart";
// import PaymentsLineChart from "./PaymentsLineChart";
import { toast } from "react-toastify";
// import FalconCardHeader from "../common/FalconCardHeader";
// import ButtonIcon from "../common/ButtonIcon";
import axios from "axios";
// import loadable from "@loadable/component";
// import DashBoardDepositStatus from "./DashboardDepositStatus";
import BirthChart from "./BirthChart";
// import BirthDetailsForm from "../chart/BirthDetailsForm";
import ProgressionChart from "./ProgressionChart";
import TransiteChart from "./TransiteChart";
// import HouseAspect from "../tables/HouseAspect";
// import HousesTable from "../tables/HousesTable";
// import PlanetsTables from "../tables/PlanetsTable";
// import AppContext, { globalContext } from "../../context/Context";
// import HouseSignificator from "../tables/HouseSignificator";
// import PlanetSignificator from "../tables/PlanetSignificator";
// import HouseAspect from "../tables/HouseAspect";
// import PlanetsTable from "../tables/PlanetsTable";
// import PlanetaryAspect from "../tables/PlanetaryAspect";
// import { Divider } from "@chakra-ui/layout";
// import { Select } from "@chakra-ui/select";
import moment from "moment-timezone";
import AnotherCharts from "../chart/AnotherCharts";
// import { ReactSearchAutocomplete } from "react-search-autocomplete";
// import Dasha from "../tables/Dasha";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Toggle from "react-toggle";
// import { Text, LanguageContext, LanguageProvider } from "./Language";
import "./Toggle.css";
// import AstakvargaTable from "../tables/AstakavargaTable";
// import YoginiDashaTable from "../tables/YoginiDashaTable";
// import CheraDashaTable from "../tables/CheraDashaTable";
import { globalContext } from "../../contexts/Context";
import { Autocomplete, Divider, Grid, TextField } from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import Dasha from "../tables/Dasha";
import Accordion from "../tables/Accordion";
import Demo from "../tables/Demo";
// import TextField from "@material-ui/core/TextField";
// import Autocomplete from "@material-ui/lab/Autocomplete";

// const PurchasesTable = loadable(() => import("./PurchasesTable"));
// const ActiveUsersMap = loadable(() => import("./ActiveUsersMap"));

const selectOptions = ["option1", "option2", "option3", "option4"];

const Dashboard = () => {
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
    color,
    setColor,
    toggleTrue,
    setToggleTrue,
    birthDateVal,
    latitudeVal,
    longitudeVal,
    locationVal,
    namesVal,
    birthTimeVal,
    setWrite,
    write,
  } = useContext(globalContext);

  // const [clickText, setClickText] = useState();
  // const [selectedOption, setSelectedOption] = useState();
  // const { dictionary } = useContext(LanguageContext);

  // const { isDark } = useContext(AppContext);

  // State
  const [isSelected, setIsSelected] = useState(false);
  const [minus, setMinus] = useState(transitionDate);
  const [plus, setPlus] = useState(equation);
  const [clickedButton, setClickedButton] = useState(false);

  const [availableYears] = useState(() => {
    let temp = [];
    for (let i = 1920; i <= 2100; i++) {
      temp.push(i);
    }
    return temp;
  });
  const startYear = 1920;

  const [chartsShow, setChartsShow] = useState("d1Chart");

  // const { data } = useContext(globalContext);

  useEffect(() => {
    toast(
      <Fragment>
        Welcome to <strong> React</strong>!<br />
        ReactJS Dashboard and WebApp Template
      </Fragment>
    );
  }, []);

  useEffect(() => {
    axios
      .post("https://rahasyavedic.herokuapp.com/api/getprogressionChart", {
        dateString: `${minus}-06-25`,
        timeString: "13:17:17",
        lat: 54.567,
        lng: 64.657,
        ayanamsha: 1,
      })
      .then((result) => {
        console.log(result);
        setProgressionChart(result.data.charts);
      });
    axios
      .post("https://rahasyavedic.herokuapp.com/api/gettransitChart", {
        dateString: `${minus}-06-25`,
        timeString: "13:17:17",
        lat: 54.567,
        lng: 64.657,
        ayanamsha: 1,
      })
      .then((result) => {
        // console.log(result.data.charts.d1Chart);
        setTransitChart(result.data.charts);
      });
    setProgressionDate(parseInt(addDate) + parseInt(date));
    // console.log(progrestionDate);
    // setDate(parseInt(e.target.value - equation));
    // setTransitionDate(e.target.value);
    // console.log(transitionDate);
  }, [minus]);

  const handleDate = (e) => {
    console.log(finalProgressionDate);
    axios
      .post("https://rahasyavedic.herokuapp.com/api/getprogressionChart", {
        dateString: "2021-06-25",
        timeString: "13:17:17",
        lat: 54.567,
        lng: 64.657,
        ayanamsha: 1,
      })
      .then((result) => {
        console.log(result);
        setProgressionChart(result.data.charts);
      });
    axios
      .post("https://rahasyavedic.herokuapp.com/api/gettransitChart", {
        dateString: "2021-06-25",
        timeString: "13:17:17",
        lat: 54.567,
        lng: 64.657,
        ayanamsha: 1,
      })
      .then((result) => {
        // console.log(result.data.charts.d1Chart);
        setTransitChart(result.data.charts);
      });
    setProgressionDate(parseInt(addDate) + parseInt(date));
    // console.log(progrestionDate);
    setDate(parseInt(e.target.value - equation));
    setTransitionDate(e.target.value);
    // console.log(transitionDate);
  };

  let finalTransitDate = moment(formData.birthDate).format("DD-MM-") + transitionDate;

  let finalProgressionDate = progrestionDate + moment(formData.birthDate).format("-MM-YYYY");

  // console.log(finalProgressionDate);

  if (date === 0) {
    finalProgressionDate = formData.birthDate;
    finalTransitDate = formData.birthDate;
  }

  const handleMinus = (e) => {
    // console.log(transitionDate);
    setClickedButton(true);
    setMinus(parseInt(minus) - 1);
    console.log(minus);
    // axios
    //   .post("http://localhost:9002/api/getprogressionChart", {
    //     dateString: finalProgressionDate,
    //     timeString: formData.birthTime,
    //     lat: formData.latitude,
    //     lng: formData.longitude,
    //     ayanamsha: selectedAyanamsha,
    //   })
    //   .then((result) => {
    //     console.log(data.dasha);
    //     setProgressionChart(result.data.charts);
    //   });

    // axios
    //   .post("http://localhost:9002/api/gettransitChart", {
    //     dateString: finalTransitDate,
    //     timeString: formData.birthTime,
    //     lat: formData.latitude,
    //     lng: formData.longitude,
    //     ayanamsha: selectedAyanamsha,
    //   })
    //   .then((result) => {
    //     console.log(result.data.charts.d1Chart);
    //     setTransitChart(result.data.charts);
    //   });

    // setProgressionDate(parseInt(addDate) + parseInt(date));
    // console.log(progrestionDate);
    // setDate(parseInt(e.target.value - equation));

    // setTransitionDate(e.target.value);
    // console.log(transitionDate);
    // handleDate();
  };

  const handlePlus = (e) => {
    setClickedButton(true);
    setMinus(parseInt(minus) + 1);
    console.log(parseInt(minus) + 1);
    // axios
    //   .post("http://localhost:9002/api/getprogressionChart", {
    //     dateString: finalProgressionDate,
    //     timeString: formData.birthTime,
    //     lat: formData.latitude,
    //     lng: formData.longitude,
    //     ayanamsha: selectedAyanamsha,
    //   })
    //   .then((result) => {
    //     console.log(data.dasha);
    //     setProgressionChart(result.data.charts);
    //   });

    // axios
    //   .post("http://localhost:9002/api/gettransitChart", {
    //     dateString: finalTransitDate,
    //     timeString: formData.birthTime,
    //     lat: formData.latitude,
    //     lng: formData.longitude,
    //     ayanamsha: selectedAyanamsha,
    //   })
    //   .then((result) => {
    //     console.log(result.data.charts.d1Chart);
    //     setTransitChart(result.data.charts);
    //   });

    // setProgressionDate(parseInt(addDate) + parseInt(date));
    // console.log(progrestionDate);
    // setDate(parseInt(e.target.value - equation));

    // setTransitionDate(e.target.value);
    // console.log(transitionDate);
  };

  const handleCharts = (e, val) => {
    setChartsShow(e.target.lastChild.data);
    // console.log(e.target.lastChild.data);
  };

  const handleToggle = () => {
    // console.log(toggleTrue);
    setToggleTrue(!toggleTrue);
    // console.log(toggleTrue);
  };

  const handleColor = (e) => {
    setColor(e.target.value);
    console.log(color);
  };

  const handleSearch = () => {
    axios.get("http://localhost:9002/search").then((result) => {
      console.log(result);
      console.log("clicked");
    });
  };

  const top100Films = [
    { title: "d1Chart" },
    { title: "d2Chart" },
    { title: "d3Chart" },
    { title: "d4Chart" },
    { title: "d5Chart" },
    { title: "d7Chart" },
    { title: "d8Chart" },
    { title: "d9Chart" },
    { title: "d10Chart" },
    { title: "d12Chart" },
    { title: "d16Chart" },
    { title: "d20Chart" },
    { title: "d24Chart" },
    { title: "d27Chart" },
    { title: "d30Chart" },
    { title: "d40Chart" },
    { title: "d45Chart" },
    { title: "d60Chart" },
  ];

  return (
    <Fragment>
      <DragDropContext>
        {/* <PaymentsLineChart /> */}
        {/* <DashBoardDepositStatus /> */}

        {/*---------------------For mobile view-----------------------------  */}

        <div className="card-deck" style={{ flexFlow: "inherit", border: "none" }}>
          <Grid sx={{ display: { xs: "flex", md: "none" } }}>
            <div className="row">
              <div className="col-sm-4">
                {/* <Droppable> */}
                {/* <Text tid="" /> */}
                <div style={{ border: "none" }}>
                  {/* <Draggable> */}
                  {data && (
                    <div style={{ textAlign: "justify" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "-16px",
                        }}
                      ></div>
                    </div>
                  )}
                  <CardSummary
                    style={{ backgroundColor: "white", width: "max-content", border: "none" }}
                    // linkText='See all'
                  >
                    <BirthChart color={color} toggleTrue={toggleTrue} />
                  </CardSummary>
                  {/* </Draggable> */}
                </div>
              </div>
              <div className="col-sm-4">
                {/* </Droppable> */}
                <div>
                  {data && (
                    <>
                      <div
                        style={{
                          alignItems: "center",
                          display: "flex",
                          width: "353px",
                          minWidth: "300px",
                          // marginLeft: "20px",
                          justifyContent: "space-between",
                        }}
                      >
                        <div style={{ textAlign: "justify", marginTop: "17px" }}>
                          <h5>Progression Chart</h5>
                          <p style={{ fontSize: "12px" }}>
                            DATE - {finalTransitDate} AGE-
                            {date}
                          </p>
                        </div>
                        {/* <div> */}
                        <Button
                          style={{
                            // height: "30px",
                            // width: "30px",
                            backgroundColor: "transparent",
                            color: "black",
                            border: "none",
                            fontSize: "25px",
                          }}
                          onClick={(e) => handleMinus(e)}
                        >
                          -
                        </Button>
                        <div style={{ display: "flex" }}>
                          {/* <Autocomplete
                    id='combo-box-demo'
                    // options={top100Films}
                    getOptionLabel={(option) => option.title}
                    style={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label='Combo box'
                        variant='outlined'
                      />
                    )}
                  /> */}
                          {/* {console.log(minus)} */}
                          <input
                            type="text"
                            list="browsers"
                            value={
                              clickedButton ? minus : moment(formData.birthDate).format("YYYY")
                            }
                            onClick={(e) => handleDate(e)}
                            style={{
                              width: "100px",
                              height: "30px",
                              fontSize: "12px",
                              // marginRight: "10px",
                            }}
                          />
                          <datalist id="browsers" style={{ width: "50px" }}>
                            {availableYears.map((item, index) => {
                              return <option>{item}</option>;
                            })}
                          </datalist>
                          {/* <Select
                    defaultValue={moment(formData.birthDate).format("YYYY")}
                    onClick={(e) => handleDate(e)}
                    style={{
                      width: "100px",
                      height: "30px",
                      fontSize: "12px",
                      marginLeft: "0px",
                    }}
                  >
                    {availableYears.map((item, index) => {
                      return <option>{item}</option>;
                    })}
                  </Select> */}
                        </div>

                        <Button
                          style={{
                            // height: "30px",
                            // width: "30px",
                            backgroundColor: "transparent",
                            color: "black",
                            border: "none",
                            fontSize: "23px",
                          }}
                          onClick={(e) => handlePlus(e)}
                        >
                          +
                        </Button>
                        {/* </div> */}
                      </div>
                      <Divider
                        style={{
                          border: "1px solid grey",
                          // marginBottom: "10px",
                          // marginTop: "0px",
                          marginLeft: "0px",
                          width: "22vw",
                          minWidth: "18rem",
                          // width: "450px",
                        }}
                      />
                    </>
                  )}
                  <CardSummary
                    rate="0.0%"
                    title="Orders"
                    color="info"
                    // style={{ paddingLeft: "50px" }}
                    // linkText='All orders'
                  >
                    <ProgressionChart color={color} />
                  </CardSummary>
                </div>
              </div>
              <div className="col-sm-4">
                <div>
                  {data && (
                    <>
                      <div style={{ display: "flex", textAlign: "justify", marginTop: "17px" }}>
                        {console.log(chartsShow)}

                        <Autocomplete
                          id="combo-box-demo"
                          onChange={(e) => handleCharts(e)}
                          options={top100Films}
                          getOptionLabel={(option) => option.title}
                          style={{ width: "220px", marginTop: "9px", marginBottom: "5px" }}
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
                        <CreateIcon
                          // onClick={setWrite(!write)}
                          style={{ height: "60px", marginLeft: "10px" }}
                        />
                        {/* {chartsShow === "d1Chart" ? (
                         
                        ) : null} */}
                        {/* <input
                          list="chart"
                          onClick={(e) => handleCharts(e)}
                          style={{
                            fontSize: "14px",
                            height: "30px",
                            marginLeft: "10px",
                            marginTop: "20px",
                            width: "2vw",
                            minWidth: "16rem",
                          }}
                          defaultValue="d1Chart"
                        />
                        <datalist id="chart">
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
                        </datalist> */}
                        {/* <h5>Transition Chart</h5>
                  <p style={{ fontSize: "12px" }}>DATE - {finalTransitDate}</p> */}
                      </div>
                      <Divider
                        style={{
                          border: "1px solid grey",
                          marginBottom: "10px",
                          // width: "450px",
                          // marginLeft: "20px",
                          width: "22vw",
                          minWidth: "18rem",
                        }}
                      />
                    </>
                  )}
                  <CardSummary
                    content="35,594"
                    rate="5.54%"
                    title="Revenue"
                    color="success"
                    // linkText='Statistics'
                  >
                    <TransiteChart color={color} chartsShow={chartsShow} />
                  </CardSummary>
                </div>
              </div>
            </div>
            <div className="card-deck">
              <CardSummary
                style={{
                  backgroundColor: color,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  overflow: "scroll",
                }}
              >
                {/* {data && <HousesTable />} */}
              </CardSummary>
              <CardSummary
                style={{
                  overflow: "scroll",
                  // backgroundColor: isDark ? "transparent" : "#F9FAFD",
                }}
              >
                {/* <PlanetsTable /> */}
              </CardSummary>
            </div>
            <div className="card-deck">
              <CardSummary style={{ overflow: "scroll" }}>
                {/* {data && <HouseSignificator />} */}
              </CardSummary>
              <CardSummary style={{ overflow: "scroll" }}>
                {/* {data && <PlanetSignificator />}{" "} */}
              </CardSummary>
            </div>
            {/* {data && <Dasha />} */}
            {/* <Button onClick={(e) => handleSearch(e)}>Click</Button> */}
            {/* <Card className="mb-3" style={{ overflow: "scroll", marginTop: "20px" }} draggable>
          <FalconCardHeader title=" " light={false}>
            {data && <HouseAspect />}
          </FalconCardHeader>
        </Card>
        <Card className="mb-3" style={{ overflow: "scroll" }}>
          <FalconCardHeader title=" " light={false}>
            <CardBody lg='6' className='pr-lg-2'>
            {data && <PlanetaryAspect />}
            </CardBody>
          </FalconCardHeader>
        </Card> */}
            {/* {data && <AnotherCharts />} */}
            {/* <CardSummary style={{ overflow: "scroll" }}>
          {data && <AstakvargaTable />}
        </CardSummary>
        <CardSummary style={{ overflow: "scroll" }}>
          {data && <YoginiDashaTable />}
        </CardSummary>
        <CardSummary style={{ overflow: "scroll" }}>
          {data && <CheraDashaTable />}
        </CardSummary> */}
          </Grid>
        </div>

        {/*---------------------For desktop view-----------------------------  */}

        <Grid sx={{ display: { xs: "none", md: "flex" } }}>
          <div
            className="card-deck"
            style={{ flexFlow: "inherit", border: "none", marginLeft: "-75px" }}
          >
            <div style={{ border: "none" }}>
              {/* <Draggable> */}
              {data && (
                <div style={{ textAlign: "justify" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "-16px",
                    }}
                  ></div>
                </div>
              )}
              <CardSummary
                style={{ backgroundColor: "white", width: "max-content", border: "none" }}
                // linkText='See all'
              >
                <BirthChart color={color} toggleTrue={toggleTrue} />
              </CardSummary>
            </div>
            <div>
              {data && (
                <>
                  <div
                    style={{
                      alignItems: "center",
                      display: "flex",
                      width: "353px",
                      marginLeft: "20px",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ textAlign: "justify", marginTop: "17px" }}>
                      <h5>Progression Chart</h5>
                      <p style={{ fontSize: "12px" }}>
                        DATE - {finalTransitDate} AGE-
                        {date}
                      </p>
                    </div>
                    {/* <div> */}
                    <Button
                      style={{
                        // height: "30px",
                        // width: "30px",
                        backgroundColor: "transparent",
                        color: "black",
                        border: "none",
                        fontSize: "25px",
                      }}
                      onClick={(e) => handleMinus(e)}
                    >
                      -
                    </Button>
                    <div style={{ display: "flex" }}>
                      {/* <Autocomplete
                    id='combo-box-demo'
                    // options={top100Films}
                    getOptionLabel={(option) => option.title}
                    style={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label='Combo box'
                        variant='outlined'
                      />
                    )}
                  /> */}
                      {console.log(minus)}
                      <input
                        type="text"
                        list="browsers"
                        value={clickedButton ? minus : moment(formData.birthDate).format("YYYY")}
                        onClick={(e) => handleDate(e)}
                        style={{
                          width: "100px",
                          height: "30px",
                          fontSize: "12px",
                          // marginRight: "10px",
                        }}
                      />
                      <datalist id="browsers" style={{ width: "50px" }}>
                        {availableYears.map((item, index) => {
                          return <option>{item}</option>;
                        })}
                      </datalist>
                      {/* <Select
                    defaultValue={moment(formData.birthDate).format("YYYY")}
                    onClick={(e) => handleDate(e)}
                    style={{
                      width: "100px",
                      height: "30px",
                      fontSize: "12px",
                      marginLeft: "0px",
                    }}
                  >
                    {availableYears.map((item, index) => {
                      return <option>{item}</option>;
                    })}
                  </Select> */}
                    </div>

                    <Button
                      style={{
                        // height: "30px",
                        // width: "30px",
                        backgroundColor: "transparent",
                        color: "black",
                        border: "none",
                        fontSize: "23px",
                      }}
                      onClick={(e) => handlePlus(e)}
                    >
                      +
                    </Button>
                    {/* </div> */}
                  </div>
                  <Divider
                    style={{
                      border: "1px solid grey",
                      // marginBottom: "10px",
                      // marginTop: "0px",
                      marginLeft: "14px",
                      width: "23vw",
                      minWidth: "18rem",
                      // width: "450px",
                    }}
                  />
                </>
              )}
              <CardSummary
                rate="0.0%"
                title="Orders"
                color="info"
                // linkText='All orders'
              >
                <ProgressionChart color={color} />
              </CardSummary>
            </div>
            {/* </div>
              <div className="col-sm-4"> */}
            <div>
              {data && (
                <>
                  <div
                    style={{
                      display: "flex",
                      textAlign: "justify",
                      marginTop: "20px",
                      marginLeft: "30px",
                    }}
                  >
                    {/* <CreateIcon style={{ height: "60px" }} /> */}
                    <Autocomplete
                      id="combo-box-demo"
                      options={top100Films}
                      onChange={(e) => handleCharts(e)}
                      getOptionLabel={(option) => option.title}
                      style={{ width: "300px", marginTop: "9px", marginBottom: "-10px" }}
                      hiddenLabel="true"
                      defaultValue={top100Films.find((v) => v.title[0])}
                      renderInput={(params) => (
                        <TextField
                          // placeholder="combo-box"
                          {...params}
                          // label=" "
                          // placeholder="abd"
                          value="d1Chart"
                          variant="outlined"
                        />
                      )}
                    />
                    <CreateIcon style={{ height: "60px", marginLeft: "10px" }} />

                    {/* <input
                      list="chart"
                      onClick={(e) => handleCharts(e)}
                      style={{
                        fontSize: "14px",
                        height: "30px",
                        marginLeft: "10px",
                        marginTop: "20px",
                        width: "300px",
                        minWidth: "16rem",
                      }}
                      defaultValue="d1Chart"
                    />
                    <datalist id="chart">
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
                    </datalist> */}
                    {/* <h5>Transition Chart</h5>
                  <p style={{ fontSize: "12px" }}>DATE - {finalTransitDate}</p> */}
                  </div>
                  <Divider
                    style={{
                      border: "1px solid grey",
                      marginBottom: "10px",
                      // width: "450px",
                      marginLeft: "15px",
                      width: "23vw",
                      minWidth: "18rem",
                    }}
                  />
                </>
              )}
              <CardSummary
                content="35,594"
                rate="5.54%"
                title="Revenue"
                color="success"
                // linkText='Statistics'
              >
                <TransiteChart color={color} chartsShow={chartsShow} />
              </CardSummary>
            </div>
            {/* </div> */}
            {/* </div> */}
            <div className="card-deck">
              <CardSummary
                style={{
                  backgroundColor: color,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  overflow: "scroll",
                }}
              >
                {/* {data && <HousesTable />} */}
              </CardSummary>
              <CardSummary
                style={{
                  overflow: "scroll",
                  // backgroundColor: isDark ? "transparent" : "#F9FAFD",
                }}
              >
                {/* <PlanetsTable /> */}
              </CardSummary>
            </div>
            <div className="card-deck">
              <CardSummary style={{ overflow: "scroll" }}>
                {/* {data && <HouseSignificator />} */}
              </CardSummary>
              <CardSummary style={{ overflow: "scroll" }}>
                {/* {data && <PlanetSignificator />}{" "} */}
              </CardSummary>
            </div>
            {/* {data && <Dasha />} */}
            {/* <Button onClick={(e) => handleSearch(e)}>Click</Button> */}
            {/* <Card className="mb-3" style={{ overflow: "scroll", marginTop: "20px" }} draggable>
          <FalconCardHeader title=" " light={false}>
            {data && <HouseAspect />}
          </FalconCardHeader>
        </Card>
        <Card className="mb-3" style={{ overflow: "scroll" }}>
          <FalconCardHeader title=" " light={false}>
            <CardBody lg='6' className='pr-lg-2'>
            {data && <PlanetaryAspect />}
            </CardBody>
          </FalconCardHeader>
        </Card> */}
            {/* {data && <AnotherCharts />} */}
            {/* <CardSummary style={{ overflow: "scroll" }}>
          {data && <AstakvargaTable />}
        </CardSummary>
        <CardSummary style={{ overflow: "scroll" }}>
          {data && <YoginiDashaTable />}
        </CardSummary>
        <CardSummary style={{ overflow: "scroll" }}>
          {data && <CheraDashaTable />}
        </CardSummary> */}
          </div>
        </Grid>
        {/* {data && <Dasha />} */}
        {/* <Accordion /> */}
        <Demo />
      </DragDropContext>
    </Fragment>
  );
};

export default Dashboard;

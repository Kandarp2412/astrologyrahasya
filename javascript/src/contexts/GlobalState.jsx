import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { globalContext } from "./Context";
import moment from "moment";
import PropTypes from "prop-types";
import { useRef } from "react";

const GlobalState = (props) => {
  const { children } = props;

  const [formData, setFormData] = useState({
    name: "",
    birthDate: "2021-04-24",
    birthTime: "13:49:32",
    latitude: 73.345324,
    longitude: 22.43253,
    timezone: 5,
  });

  const [chartType, setChartType] = useState("South Indian");

  const birthDateVal = useRef("2021-04-24");
  const latitudeVal = useRef("73.7667");
  const longitudeVal = useRef("22.32657");
  const locationVal = useRef("vadodara,gujarat,India");
  const namesVal = useRef("sad");

  const birthTimeVal = useRef("13:49:32");

  const [progressionChart, setProgressionChart] = useState(birthDateVal.current.value);
  const [transitChart, setTransitChart] = useState({});
  const [toggleTrue, setToggleTrue] = useState(false);
  const [selectedCharts, setSelectedCharts] = useState(["d1Chart"]);
  const [anotherCharts, setAnotherCharts] = useState([
    "d7Chart",
    "d9Chart",
    "d10Chart",
    "d60Chart",
  ]);
  const [date, setDate] = useState(0);

  const [astavargaPoints, setAstavargaPoints] = useState({});
  const [astavargaPointsCount, setAstavargaPointsCount] = useState([]);
  const [tableNames, setTableNames] = useState([]);

  const [yoginiDasa, setYoginiDasa] = useState({});
  const [yoginiDasaYear, setYoginiDasaYear] = useState([]);
  const [cheraDashaSignName, setCheraDashaSignName] = useState([]);
  const [cheraDashaResult, setCheraDashaResult] = useState([]);

  const [cheraDashaPlanetName, setcheraDashaPlanetName] = useState("Aries");

  const [moonSign, setMoonSign] = useState("");

  const equation = moment(birthDateVal.current.value).format("yyyy");

  const addDate = moment(birthDateVal.current.value).format("DD");

  const [transitionDate, setTransitionDate] = useState(equation);
  const [write, setWrite] = useState(false);

  const [progrestionDate, setProgressionDate] = useState(addDate);

  const [color, setColor] = useState("lightgoldenrodyellow");

  let finalTransitDate;
  // moment(birthDateVal.current.value).format("DD-MM-") + transitionDate;

  let finalProgressionDate;
  // progrestionDate + moment(formData.birthDate).format("-MM-YYYY");

  if (date === 0) {
    finalProgressionDate = birthDateVal.current.value;
    finalTransitDate = birthDateVal.current.value;
  }
  const [data, setData] = useState();
  const [dasha, setDasha] = useState([]);
  const [ayanamshas, setAyanamshas] = useState();
  const [selectedAyanamsha, setSelectedAyanamsha] = useState(1);
  useEffect(() => {
    axios
      .get("https://rahasyavedic.herokuapp.com/api/ayanamsha")
      .then((res) => {
        setAyanamshas(res?.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleFormChange = (e) => {
    setFormData((oldData) => {
      return { ...oldData, [e.target.name]: e.target.value };
    });
  };
  return (
    <globalContext.Provider
      value={{
        formData,
        setFormData,
        handleFormChange,
        data,
        setData,
        ayanamshas,
        selectedAyanamsha,
        setSelectedAyanamsha,
        dasha,
        setDasha,
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
        finalTransitDate,
        finalProgressionDate,
        color,
        setColor,
        chartType,
        setChartType,
        toggleTrue,
        setToggleTrue,
        astavargaPoints,
        setAstavargaPoints,
        astavargaPointsCount,
        setAstavargaPointsCount,
        tableNames,
        setTableNames,
        yoginiDasa,
        setYoginiDasa,
        yoginiDasaYear,
        setYoginiDasaYear,
        cheraDashaSignName,
        setCheraDashaSignName,
        cheraDashaResult,
        setCheraDashaResult,
        moonSign,
        setMoonSign,
        cheraDashaPlanetName,
        setcheraDashaPlanetName,
        birthDateVal,
        latitudeVal,
        longitudeVal,
        locationVal,
        namesVal,
        birthTimeVal,
        write,
        setWrite,
      }}
    >
      {children}
    </globalContext.Provider>
  );
};

GlobalState.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GlobalState;

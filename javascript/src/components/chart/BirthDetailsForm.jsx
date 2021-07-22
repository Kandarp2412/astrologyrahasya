// import { Button } from "@chakra-ui/react";
// import { Select } from "@chakra-ui/react";

// import { FormControl, FormLabel } from "@chakra-ui/form-control";
// import { Input } from "@chakra-ui/input";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
// import { globalContext } from "../context/Context";
import axios from "axios";
// import AppContext, { globalContext } from "../../context/Context";
// import countryList from "react-select-country-list";
// import cities from "cities.json";
// import { Button, InputLabel } from "@material-ui/core";
// import LanguageSelector from "../dashboard/LanguageSelector";
import Demo from "./Demo";
// import { countries } from "country-data-list";
import Autocomplete from "@material-ui/lab/Autocomplete";
// import timezones from "timezones-list";
// import tz from "tz-db";
import { globalContext } from "../../contexts/Context";
import { LocalizationProvider, TimePicker } from "@material-ui/lab";
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import DateFnsUtils from "@date-io/date-fns";
import {
  Box,
  Container,
  Divider,
  Tab,
  Grid,
  Tabs,
  TextField,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@material-ui/core";
// import { Demo } from "./Demo";
// import csc from "countries-states-cities";

const BirthDetailsForm = () => {
  // const { isDark } = useContext(AppContext);
  const [birthPlace, setBirthPlace] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("India");
  const [countryName, setCountryName] = useState([]);
  const [timezone, setTimeZone] = useState("");
  const [astakavarguPlanetName, setAstakavarguPlanetName] = useState("Sun");
  const [advancedOption, setAdvancedOption] = useState(false);

  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const [latitude, setLatidude] = useState("");
  const [longitude, setlongitude] = useState("");
  // const [timezone, setTimeZone] = useState("");
  const [value, setValue] = useState("");

  // const [age, setAge] = useState("South Indian");
  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    setChartType(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const {
    formData,
    setData,
    ayanamshas,
    selectedAyanamsha,
    setSelectedAyanamsha,
    setDasha,
    dasha,
    chartType,
    setChartType,
    astavargaPointsCount,
    setAstavargaPointsCount,
    astavargaPoints,
    setAstavargaPoints,
    setYoginiDasaYear,
    setYoginiDasa,
    cheraDashaPlanetName,
    setcheraDashaPlanetName,
    cheraDashaResult,
    setCheraDashaResult,
    cheraDashaSignName,
    setCheraDashaSignName,
    setMoonSign,
    birthDateVal,
    latitudeVal,
    longitudeVal,
    locationVal,
    namesVal,
    birthTimeVal,
  } = useContext(globalContext);

  console.log(chartType);

  const searchTime = useRef(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:9002/api/getBirthChart", {
        dateString: "2021-04-24",
        timeString: "13:49:32",
        lat: "17.3667",
        lng: "78.4667",
        timezone: "5",
        ayanamsha: 1,
      })
      .then((res) => {
        axios
          .post("http://localhost:9002/api/astakavargu", {
            reference_element: astakavarguPlanetName,
            sun_sign: res.data.astavarga.Su,
            moon_sign: res.data.astavarga.Mo,
            mars_sign: res.data.astavarga.Ma,
            mercury_sign: res.data.astavarga.Me,
            venus_sign: res.data.astavarga.Ve,
            jupiter_sign: res.data.astavarga.Ju,
            saturn_sign: res.data.astavarga.Sa,
            lagnam_sign: res.data.astavarga.La,
          })
          .then((res) => {
            setAstavargaPoints(res.data.data);
            setAstavargaPointsCount(res.data.totelPoints);
          })
          .catch((err) => console.log(err));

        axios
          .post("http://localhost:9002/api/yoginidasa", {
            moonDegree: res.data.astavarga.Mo * 30,
            dateOfBirth: formData.birthDate,
          })
          .then((res) => {
            console.log(res.data);
            setYoginiDasa(res.data.dasa);
            setYoginiDasaYear(res.data.years);
          })
          .catch((err) => {
            console.log(err);
          });
        axios
          .post("http://localhost:9002/api/cheradasa", {
            bukthi: cheraDashaPlanetName,
            Sun: res.data.cheraDasha.Su,
            Moon: res.data.cheraDasha.Mo,
            Mars: res.data.cheraDasha.Ma,
            Mercury: res.data.cheraDasha.Me,
            Venus: res.data.cheraDasha.Ve,
            Jupiter: res.data.cheraDasha.Ju,
            Saturn: res.data.cheraDasha.Sa,
            lagna: res.data.cheraDasha.La,
            Ketu: res.data.cheraDasha.Ke,
            Rahu: res.data.cheraDasha.Ra,
            marsDegree: res.data.cheraDasha.Ma * 30,
            ketuDegree: res.data.cheraDasha.Ke * 30,
            saturnDegree: res.data.cheraDasha.Sa * 30,
            rahuDegree: res.data.cheraDasha.Ra * 30,
          })
          .then((res) => {
            console.log(res);
            setMoonSign(res.data.Moon);
            setCheraDashaSignName(res.data.subArr);
            setCheraDashaResult(res.data.resultArr);
          })
          .catch((err) => {
            console.log(err);
          });
        console.log(res.data);
        setData(res.data);
        setDasha(res.data.dasha);
        console.log(dasha);
      })
      .catch((err) => console.log(err));
  };

  // const [value, setValue] = useState("");
  // const options = useMemo(() => countryList().getData(), []);

  let time = locationVal.current.value ? locationVal.current.value.split(",")[2] : "India";

  useEffect(() => {
    axios
      .post("http://localhost:9002/timezone", {
        birthDateVal: birthDateVal.current.value,
        locationVal: time,
      })

      .then((res) => {
        setTimeZone(res.data.data);
      });
  }, [locationVal.current.value]);

  useEffect(() => {
    axios
      .post("http://localhost:9002/searching3", {
        search: search,
      })
      .then((result) => {
        setResult(result.data.data);
      })
      .catch((err) => console.log(err));
  }, [search]);

  const handleBirthPlace = (e) => {
    console.log(e.target.value);
    var searchText = e.target.value;

    if (searchTime.current) {
      clearTimeout(searchTime.current);
    }

    searchTime.current = setTimeout(() => {
      setSearch(searchText);
    }, 500);
  };

  const handleTextFeild = (event, val) => {
    val ? setLatidude(val.latitude) : setLatidude("");
    val ? setlongitude(val.longitude) : setlongitude("");
  };

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:9002/search")
  //     .then(
  //       (result) => setCountryName(result.data.data)
  //       // setCountryName(result.data)
  //     )
  //     .catch((err) => console.log(err));
  // }, []);

  // useEffect(() => {
  //   axios
  //     .post("http://localhost:9002/timezone", {
  //       locationVal: time,
  //     })
  //     .then((res) => {
  //       setTimeZone(res.data.data);
  //       // console.log(res.data.data)
  //     })
  //     .catch((err) => console.log(err));
  // }, [search]);

  // const handleCountry = (e, lat) => {
  //   setSelectedCountry(e.target.value);
  // };

  // const [lat, setlat] = useState(
  //   cities && cities.length > 0
  //     ? cities.map((clat) => {
  //         return clat.lat;
  //       })
  //     : null
  // );

  // const handleBirthPlace = (e) => {
  //   console.log(selectedCountry);
  //   axios
  //     .post("http://localhost:9002/birthsearch", {
  //       selectedCountry: selectedCountry,
  //     })
  //     .then(
  //       (result) => setBirthPlace(result.data.data)

  //     )
  //     .catch((err) => console.log(err));

  // };

  // const handleChartType = (e) => {
  //   console.log(e.target.name);
  //   setChartType(e.target.value);
  // };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <Grid item>
          <InputLabel htmlFor="name">Search saved profile</InputLabel>
          <TextField
            id="outlined-basic"
            variant="outlined"
            size="small"
            style={{ width: 150 }}
            name="name"
            inputRef={namesVal}
          />
        </Grid>

        <Grid item style={{ marginLeft: "20px" }}>
          <InputLabel htmlFor="name">Date of birth</InputLabel>
          <TextField
            id="date"
            variant="outlined"
            style={{ width: 150 }}
            size="small"
            type="date"
            inputRef={birthDateVal}
          />
        </Grid>

        <Grid item style={{ marginLeft: "20px" }}>
          <InputLabel htmlFor="name">Birth time</InputLabel>
          <LocalizationProvider className="timepicker" dateAdapter={AdapterDateFns}>
            <TimePicker
              ampm={false}
              openTo="hours"
              views={["hours", "minutes", "seconds"]}
              inputFormat="HH:mm:ss"
              mask="__:__:__"
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              style={{ width: 150, height: 8 }}
              selected={value}
              inputRef={birthTimeVal}
              renderInput={(params) => <TextField {...params} inputRef={birthTimeVal} />}
            />
          </LocalizationProvider>
        </Grid>

        <Grid item style={{ marginLeft: "20px" }}>
          <InputLabel htmlFor="locationAddress">
            Birth Place{" "}
            <a href="#" onClick={(e) => setAdvancedOption(!advancedOption)}>
              +Advanced Options
            </a>
          </InputLabel>
          <Autocomplete
            id="combo-box-demo"
            options={result}
            onChange={handleTextFeild} // prints the selected value
            getOptionLabel={(options) =>
              `${options.place} ,${options.state !== " " ? options.state : " "},${
                options.country_name
              }`
            }
            style={{ width: 325 }}
            onInputChange={handleBirthPlace}
            name="location"
            renderInput={(params) => (
              <TextField {...params} inputRef={locationVal} variant="outlined" size="small" />
            )}
          />
        </Grid>

        <Grid item style={{ marginLeft: "20px" }}>
          <InputLabel htmlFor="name">select chart</InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={chartType}
            defaultValue="South Indian"
            onChange={handleChange}
            style={{ height: "40px", width: 150 }}
          >
            <MenuItem value="North Indian">North Indian</MenuItem>
            <MenuItem value="South Indian">South Indian</MenuItem>
          </Select>
        </Grid>

        <Grid item>
          <InputLabel></InputLabel>
          <Button
            onClick={(event) => handleSubmit(event)}
            variant="contained"
            color="primary"
            style={{ height: "40px", marginLeft: "20px", marginTop: "20px" }}
          >
            Submit
          </Button>
        </Grid>

        {advancedOption === true ? (
          <div style={{ display: "flex", marginTop: "100px", marginLeft: "-855px" }}>
            <Grid item>
              <InputLabel htmlFor="longitude">Latitude</InputLabel>
              <TextField
                id="outlined-basic"
                variant="outlined"
                size="small"
                style={{ width: 325 }}
                name="latitude"
                //  inputRef={latitudeVal}
                value={latitude}
              />
            </Grid>
            <Grid item style={{ marginLeft: "10px" }}>
              <InputLabel htmlFor="latitude">Longitude</InputLabel>
              <TextField
                id="outlined-basic"
                variant="outlined"
                size="small"
                style={{ width: 325 }}
                name="longitude"
                //  inputRef={longitudeVal}
                value={longitude}
              />
            </Grid>
            <Grid item style={{ marginLeft: "10px" }}>
              <InputLabel htmlFor="timeZone">Time Zone</InputLabel>
              <TextField
                id="outlined-basic"
                variant="outlined"
                size="small"
                style={{ width: 325 }}
                name="timeZone"
                value={timezone}
              />
            </Grid>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default BirthDetailsForm;

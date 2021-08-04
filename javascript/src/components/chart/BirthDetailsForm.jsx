import React, { useContext, useEffect, useMemo, useRef, useState } from "react";

import axios from "axios";

import Demo from "./Demo";

import Autocomplete from "@material-ui/lab/Autocomplete";

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
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import toast from "react-hot-toast";
import "./Toggle.css";
import moment from "moment";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

// import { Demo } from "./Demo";
// import csc from "countries-states-cities";

const BirthDetailsForm = () => {
  // const { isDark } = useContext(AppContext);
  const [birthPlace, setBirthPlace] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("India");
  const [countryName, setCountryName] = useState([]);
  // const [timezone, setTimeZone] = useState("");
  const [astakavarguPlanetName, setAstakavarguPlanetName] = useState("Sun");
  const [advancedOption, setAdvancedOption] = useState(false);

  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const [latitude, setLatidude] = useState("");
  const [longitude, setlongitude] = useState("");
  const [timezone, setTimeZone] = useState("");
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
    oneUser,
  } = useContext(globalContext);

  // console.log(namesVal.current.value);

  const searchTime = useRef(0);
  const [checkEdit, setCheckEdit] = useState(false);
  const [checkSubmit, setCheckSubmit] = useState(false);

  const [userName, setUserName] = useState("");
  const [userBirthDate, setUserBirthDate] = useState("");
  const [userBirthTime, setUserBirthTime] = useState("");
  const [userBirthPlace, setUserBirthPlace] = useState("");
  const [top100Films, setTop100Films] = useState([]);
  const [setEditName, editName] = useState(false);

  // const [flag, setFlag] = useState(false);

  const [userExistsData, setUserExistsData] = useState([]);
  const [deleteuserFlag, setDeleteUserFlag] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    {
      checkSubmit
        ? axios
            .post("http://localhost:9003/api/profile/post", {
              name: userName,
              date: userBirthDate,
              time: userBirthTime,
              birthPlace: locationVal.current.value,
            })
            .then((res) => {
              toast.success("user created successfully");
              setRefresh(!refresh);
              console.log(res);
            })
        : null;
    }
    {
      checkEdit
        ? axios
            .post(`http://localhost:9003/api/profile/update/${defaultId}`, {
              name: userName,
              date: userBirthDate ? userBirthDate : defaultdate,
              time: userBirthTime ? userBirthTime : defaulttime,
              birthPlace: locationVal.current.value ? locationVal.current.value : defaultbirthplace,
              latitude: latitude ? latitude : defaultlatitude,
              longitude: longitude ? longitude : defaultlongitude,
              timezone: timezone ? timezone : defaulttimezone,
            })
            .then((res) => {
              toast.success(res.data.messege);
              console.log(res);
            })
        : null;
    }
    {
      deleteuserFlag
        ? axios.post(`http://localhost:9003/api/profile/delete/${defaultId}`).then((res) => {
            toast.success("User deleted successfully ");
          })
        : null;
    }
    axios
      .post("http://localhost:9003/api/getBirthChart", {
        dateString: "2021-04-24",
        timeString: "13:49:32",
        lat: "17.3667",
        lng: "78.4667",
        timezone: "5",
        ayanamsha: 1,
      })
      .then((res) => {
        axios
          .post("http://localhost:9003/api/astakavargu", {
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
          .post("http://localhost:9003/api/yoginidasa", {
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
          .post("http://localhost:9003/api/cheradasa", {
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
  console.log(locationVal);

  // let time = locationVal.current.value !== "" ? locationVal.current.value.split(",")[2] : "India";

  // useEffect(() => {
  //   axios
  //     .post("http://localhost:9003/timezone", {
  //       birthDateVal: birthDateVal.current.value,
  //       locationVal: time,
  //     })

  //     .then((res) => {
  //       setTimeZone(res.data.data);
  //     });
  // }, [time]);

  useEffect(() => {
    axios
      .post("http://localhost:9003/searching3", {
        search: search,
      })
      .then((result) => {
        setResult(result.data.data);
      })
      .catch((err) => console.log(err));
  }, [search]);

  // console.log(locationVal.current.value);

  const handleBirthPlace = (e) => {
    // console.log(e.target.value);
    var searchText = e !== null ? e.target.value : "";

    if (searchTime.current) {
      clearTimeout(searchTime.current);
    }

    searchTime.current = setTimeout(() => {
      setSearch(searchText);
    }, 500);
  };

  const handleTextFeild = (event, val) => {
    // console.log(event.target.lastChild.data);
    setUserBirthPlace(event.target.lastChild.data);
    val ? setLatidude(val.latitude) : setLatidude("");
    val ? setlongitude(val.longitude) : setlongitude("");
  };

  const handleEdit = () => {
    setCheckEdit(!checkEdit);
  };

  const handleDelete = () => {
    setDeleteUserFlag(!deleteuserFlag);
  };

  const handleDate = (date) => {
    console.log(date);
    // setUserBirthDate(date)
  };

  const handleCheckBoxSubmit = () => {
    // let name1 = namesVal.current.value !== null ? namesVal.current.value : userName,

    // axios
    //   .post("http://localhost:9003/api/profile/post", {
    //     name: userName,
    //     date: birthDateVal.current.value,
    //     time: userBirthTime,
    //     birthPlace: locationVal.current.value,
    //   })
    //   .then((res) => {
    //     toast.success("user created successfully");
    //     console.log(res);
    //   });
    setCheckSubmit(!checkSubmit);
  };

  useEffect(() => {
    axios.get("http://localhost:9003/api/profile/search", {}).then((res) => {
      console.log(res.data.data);
      setTop100Films(res.data.data);
    });
  }, [refresh]);

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

  const handleCountry = (e, lat) => {
    setSelectedCountry(e.target.value);
  };

  useEffect(() => {
    axios.get("http://localhost:9003/api/profile/get").then((res) => {
      // console.log(res.data.data);
      setUserExistsData(res.data.data);
    });
  }, []);

  let a4 = userExistsData.find((i) => i.name === userName);
  let defaultId = a4 !== undefined ? a4._id : "";

  // const handleDeleteUser = () => {
  //   axios.post(`http://localhost:9003/api/profile/delete/${defaultId}`).then((res) => {
  //     toast.success("User deleted successfully ");
  //   });
  // };

  console.log(userExistsData);

  let a1 = userExistsData.find((i) => i.name === userName);
  let defaulttime = a1 !== undefined ? a1.time : "";
  // console.log(defaulttime);

  let a2 = userExistsData.find((i) => i.name === userName);
  let defaultdate = a2 !== undefined ? a2.date : "";

  let a3 = userExistsData.find((i) => i.name === userName);
  let defaultbirthplace = a3 !== undefined ? "hyd,hyd,hyd" : "";

  let a5 = userExistsData.find((i) => i.name === userName);
  let defaultlatitude = a5 !== undefined ? a5.latitude : "";

  let a7 = userExistsData.find((i) => i.name === userName);
  let defaultlongitude = a7 !== undefined ? a7.longitude : "";

  let a8 = userExistsData.find((i) => i.name === userName);
  let defaulttimezone = a8 !== undefined ? a8.timezone : "";

  console.log(defaultlatitude);

  // console.log(defaultbirthplace, a3.birthPlace);

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
  let flag = false;

  flag = userBirthTime && userName && userBirthDate && userBirthPlace ? true : false;

  console.log(userBirthTime, userName, userBirthDate, userBirthPlace);

  console.log(flag);

  // console.log(flag);

  let a = top100Films.map((option) => option);

  // console.log(oneUser);

  // let defaultUser = a.find((option) => option === userName);
  // console.log(defaultUser);
  // let defaulttime = defaultUser.time;
  // console.log(
  //   a.find((option) => option === userName)
  //     ? userExistsData.map((i) => {
  //         return i.time;
  //       })
  //     : "null"
  // );

  // console.log(a.find((option) => option === userName) ? userExistsData[0].time : "null");

  // console.log(typeof defaulttime);

  // console.log(a.find((option) => option === userName) ? "exists" : "not exists");

  // console.log(
  //   a.find((option) => option === userName) ? userExistsData.map((i) => console.log(i.date)) : null
  // );

  // const handleChartType = (e) => {
  //   console.log(e.target.name);
  //   setChartType(e.target.value);
  // };

  return (
    <div>
      <div>
        <Grid container spacing={1} sx={{ display: { xs: "flex", md: "none" } }}>
          <Grid item md={3} xs={12}>
            <InputLabel htmlFor="name">Search saved profile</InputLabel>
            <TextField
              id="outlined-basic"
              variant="outlined"
              size="small"
              style={{ width: 270 }}
              name="name"
              // defaultValue={a.find((option) => option === userName) ? oneUser.name:null }
              onChange={(e) => setUserName(e.target.value)}
              // sx={{
              //   display: {
              //     xs: "flex",
              //     md: "flex",
              //   },
              // }}
              inputRef={namesVal}
            />
          </Grid>
          <Grid item md={2} xs={12}>
            <InputLabel htmlFor="name">Date of birth</InputLabel>
            <TextField
              id="date"
              variant="outlined"
              style={{ width: 270 }}
              size="small"
              type="date"
              defaultValue={a.find((option) => option === userName) ? oneUser.date : null}
              onChange={(e) => console.log(e)}
              // sx={{
              //   display: {
              //     xs: "flex",
              //     md: {display:"flex",flexDirection:"column"},
              //   },
              // }}
              inputRef={birthDateVal}
            />
          </Grid>
          <Grid item md={1} xs={12}>
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
                style={{ width: 325, height: 8 }}
                selected={value}
                inputRef={birthTimeVal}
                renderInput={(params) => <TextField {...params} inputRef={birthTimeVal} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item md={1} xs={12}>
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
              style={{ width: 270 }}
              onInputChange={handleBirthPlace}
              name="location"
              renderInput={(params) => (
                <TextField {...params} inputRef={locationVal} variant="outlined" size="small" />
              )}
            />
          </Grid>

          <Grid sx={{ display: { xs: "flex", md: "none" } }}>
            {advancedOption === true ? (
              <div style={{ marginTop: "30px", marginLeft: "10px" }}>
                <Grid item>
                  <InputLabel htmlFor="longitude">Latitude</InputLabel>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    size="small"
                    style={{ width: 270, marginTop: "15px" }}
                    name="latitude"
                    onChange={(e) => setLatidude(e.target.value)}
                    //  inputRef={latitudeVal}
                    defaultValue={defaultlatitude}
                  />
                </Grid>
                <Grid item style={{ marginLeft: "0px" }}>
                  <InputLabel htmlFor="latitude">Longitude</InputLabel>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    size="small"
                    style={{ width: 270, marginTop: "15px" }}
                    name="longitude"
                    onChange={(e) => setlongitude(e.target.value)}
                    //  inputRef={longitudeVal}
                    defaultValue={defaultlongitude}
                  />
                </Grid>
                {console.log(timezone)}
                <Grid item style={{ marginLeft: "0px" }}>
                  <InputLabel htmlFor="timeZone">Time Zone</InputLabel>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    size="small"
                    style={{ width: 270, marginTop: "15px" }}
                    name="timeZone"
                    onChange={(e) => setTimeZone(e.target.value)}
                    defaultValue={defaulttimezone}
                  />
                </Grid>
              </div>
            ) : null}
          </Grid>

          <Grid item md={1} xs={12}>
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
              style={{ height: "40px", width: 270 }}
            >
              <MenuItem value="North Indian">North Indian</MenuItem>
              <MenuItem value="South Indian">South Indian</MenuItem>
            </Select>
          </Grid>
          {/* <Grid item md={1} xs={12}>
            <InputLabel htmlFor="name">Ayanamsha</InputLabel>
            <Select
              value={selectedAyanamsha}
              onChange={(e) => setSelectedAyanamsha(parseInt(e.target.value))}
              style={{ width: 270 }}
            >
              {ayanamshas &&
                Object.values(ayanamshas).map((value) => {
                  return (
                    <option key={value.id} value={value.id}>
                      {value.name}
                    </option>
                  );
                })}
            </Select>
          </Grid> */}
          {/* <Grid item md={1} xs={12}>
            <InputLabel htmlFor="name">Date of birth</InputLabel>
            <TextField
              id="date"
              variant="outlined"
              style={{ width: 185 }}
              size="small"
              type="date"
              sx={{
                display: {
                  xs: "flex",
                  md: {display:"flex",flexDirection:"column"},
                },
              }}
              inputRef={birthDateVal}
            />
          </Grid> */}

          <Grid item md={1} xs={12}>
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
        </Grid>

        {/*------------------------- for desktop view------------------------------------ */}

        <Grid sx={{ display: { xs: "none", md: "flex" }, marginLeft: "-79px" }}>
          <Grid item>
            <InputLabel htmlFor="name" style={{ color: "black" }}>
              Search saved profile
            </InputLabel>
            {editName ? (
              <Autocomplete
                id="free-solo-demo"
                freeSolo
                options={top100Films.map((option) => option)}
                onChange={(e) => setUserName(e.target.lastChild?.data)}
                renderInput={(params) => (
                  <TextField
                    style={{ padding: "0px" }}
                    onChange={(e) => setUserName(e.target.value)}
                    {...params}
                    margin="normal"
                    variant="outlined"
                  />
                )}
              />
            ) : (
              <Autocomplete
                id="free-solo-demo"
                freeSolo
                options={top100Films.map((option) => option)}
                value={a}
                onChange={(e) => setUserName(e.target.lastChild?.data)}
                renderInput={(params) => (
                  <TextField
                    style={{ padding: "0px" }}
                    onChange={(e) => setUserName(e.target.value)}
                    {...params}
                    margin="normal"
                    variant="outlined"
                  />
                )}
              />
            )}
          </Grid>
          {console.log(defaultId)}
          <Grid item style={{ marginLeft: "35px" }}>
            <InputLabel htmlFor="name" style={{ color: "black" }}>
              Date of birth
            </InputLabel>

            <input
              id="appt-time"
              type="date"
              name="appt-time"
              // step="2"
              defaultValue={defaultdate}
              style={{
                height: "40px",
                marginTop: "15px",
                width: "170px",
                borderRadius: "2px",
                outline: "midnightblue",
                border: "1px solid #C5C5C5",
                padding: "8px",
              }}
              onChange={(e) => setUserBirthDate(e.target.value)}
              inputRef={birthDateVal}
            />
            {/* <TextField
              id="date"
              variant="outlined"
              style={{ width: 177, marginTop: "15px" }}
              defaultValue={`${moment(defaultdate).format("YYYY-MM-DD")}`}
              size="small"
              type="date"
              onChange={(e) => setUserBirthDate(e.target.value)}
              inputRef={birthDateVal}
            /> */}
            {/* <input type="date" style={{ width: 177,height, marginTop: "15px" }}></input> */}
          </Grid>
          <Grid item style={{ marginLeft: "35px" }}>
            <InputLabel htmlFor="name" style={{ color: "black" }}>
              Birth time
            </InputLabel>
            <input
              id="appt-time"
              type="time"
              name="appt-time"
              step="2"
              defaultValue={defaulttime}
              style={{
                height: "40px",
                marginTop: "15px",
                width: "170px",
                borderRadius: "2px",
                outline: "midnightblue",
                border: "1px solid #C5C5C5",
                padding: "8px",
              }}
              onChange={(e) => setUserBirthTime(e.target.value)}
              inputRef={birthTimeVal}
            />

            {console.log(birthTimeVal)}

            {/* <InputLabel htmlFor="name">Birth time</InputLabel>
            <LocalizationProvider className="timepicker" dateAdapter={AdapterDateFns}>
              <TimePicker
                ampm={false}
                openTo="hours"
                views={["hours", "minutes", "seconds"]}
                inputFormat="HH:mm:ss"
                mask="__:__:__"
                value={value}
                onChange={(newValue, e) => {
                  setUserBirthTime(newValue);
                  setValue(newValue);
                }}
                style={{ width: 150, height: 8 }}
                selected={value}
                inputRef={birthTimeVal}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    onChange={(e) => setUserBirthTime(e.target.value)}
                    inputRef={birthTimeVal}
                  />
                )}
              />
            </LocalizationProvider> */}
          </Grid>
          <Grid item style={{ marginLeft: "35px" }}>
            <InputLabel htmlFor="locationAddress" style={{ color: "black" }}>
              Birth Place{" "}
              <a href="#" onClick={(e) => setAdvancedOption(!advancedOption)}>
                +Advanced Options
              </a>
            </InputLabel>
            <Autocomplete
              id="free-solo-demo"
              freeSolo
              options={result}
              getOptionLabel={(options) =>
                `${options.place} ,${options.state !== " " ? options.state : " "},${
                  options.country_name
                }`
              }
              // value="hyd"
              onChange={handleTextFeild}
              onInputChange={handleBirthPlace}
              // value={defaultbirthplace}
              renderInput={(params) => (
                <TextField
                  {...params}
                  style={{ marginTop: "15px" }}
                  onChange={(e) => setUserBirthPlace(e.target.value)}
                  placeholder={defaultbirthplace}
                  // value={defaultbirthplace}
                  inputRef={locationVal}
                  variant="outlined"
                  size="small"
                />
              )}
            />
            {/* <Autocomplete
              id="combo-box-demo"
              options={result}
              onChange={handleTextFeild} // prints the selected value
              getOptionLabel={(options) =>
                `${options.place} ,${options.state !== " " ? options.state : " "},${
                  options.country_name
                }`
              }
              style={{ width: 310 }}
              onInputChange={handleBirthPlace}
              name="location"
              renderInput={(params) => (
                <TextField
                  {...params}
                  style={{ marginTop: "15px" }}
                  onChange={(e) => setUserBirthPlace(e.target.value)}
                  defaultValue={a.find((option) => option === userName) ? "vadodara" : "null"}
                  inputRef={locationVal}
                  variant="outlined"
                  size="small"
                />
              )}
            /> */}
          </Grid>
          <Grid item style={{ marginLeft: "35px", marginRight: "15px" }}>
            <InputLabel htmlFor="name" style={{ color: "black" }}>
              select chart
            </InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={open}
              onClose={handleClose}
              onOpen={handleOpen}
              value={chartType}
              defaultValue="South Indian"
              onChange={handleChange}
              style={{ height: "40px", width: 150, marginTop: "15px" }}
            >
              <MenuItem value="North Indian">North Indian</MenuItem>
              <MenuItem value="South Indian">South Indian</MenuItem>
            </Select>
          </Grid>
          {/* <Grid item style={{ marginLeft: "10px" }}>
            <InputLabel htmlFor="name">Ayanamsha</InputLabel>
            <Select
              value={selectedAyanamsha}
              onChange={(e) => setSelectedAyanamsha(parseInt(e.target.value))}
            >
              {ayanamshas &&
                Object.values(ayanamshas).map((value) => {
                  return (
                    <option key={value.id} value={value.id}>
                      {value.name}
                    </option>
                  );
                })}
            </Select>
          </Grid> */}
          {a.find((option) => option === userName) ? (
            <>
              {checkSubmit ? (
                <>
                  <FormControlLabel
                    control={
                      <Checkbox
                        disabled
                        // checked={state.checkedB}
                        onChange={handleEdit}
                        name="checkedB"
                        color="primary"
                      />
                    }
                    label="Edit"
                    style={{ marginTop: "-60px", marginLeft: "30px", marginRight: "9px" }}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        disabled
                        // checked={state.checkedB}
                        onChange={handleDelete}
                        name="checkedB"
                        color="primary"
                      />
                    }
                    label="Delete"
                    style={{ marginTop: "-60px", marginLeft: "30px", marginRight: "9px" }}
                  />
                </>
              ) : (
                <>
                  <FormControlLabel
                    control={
                      <Checkbox
                        // checked={state.checkedB}
                        onChange={handleEdit}
                        name="checkedB"
                        color="primary"
                      />
                    }
                    label="Edit"
                    style={{ marginTop: "-60px", marginLeft: "30px", marginRight: "9px" }}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        // disabled
                        // checked={state.checkedB}
                        onChange={handleDelete}
                        name="checkedB"
                        color="primary"
                      />
                    }
                    label="Delete"
                    style={{ marginTop: "-60px", marginRight: "9px" }}
                  />
                </>
              )}
            </>
          ) : (
            <>
              <FormControlLabel
                control={
                  <Checkbox
                    disabled
                    // checked={state.checkedB}
                    onChange={handleEdit}
                    name="checkedB"
                    color="primary"
                  />
                }
                label="Edit"
                style={{ marginTop: "-60px", marginLeft: "30px", marginRight: "9px" }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    disabled
                    // checked={state.checkedB}
                    onChange={handleDelete}
                    name="checkedB"
                    color="primary"
                  />
                }
                label="Delete"
                style={{ marginTop: "-60px", marginRight: "9px" }}
              />
            </>
          )}
          {flag ? (
            <>
              {checkEdit ? (
                <>
                  <FormControlLabel
                    control={
                      <Checkbox
                        disabled
                        // checked={state.checkedB}
                        // onChange={handleChange}
                        name="checkedB"
                        color="primary"
                      />
                    }
                    label="Save"
                    style={{ marginTop: "-60px", marginRight: "-15px" }}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        disabled
                        // checked={state.checkedB}
                        onChange={handleDelete}
                        name="checkedB"
                        color="primary"
                      />
                    }
                    label="Delete"
                    style={{ marginTop: "-60px", marginRight: "9px" }}
                  />
                </>
              ) : (
                <>
                  <FormControlLabel
                    control={
                      <Checkbox
                        // checked={state.checkedB}
                        onChange={handleCheckBoxSubmit}
                        name="checkedB"
                        color="primary"
                      />
                    }
                    label="Save"
                    style={{ marginTop: "-60px", marginRight: "-15px" }}
                  />
                </>
              )}
            </>
          ) : (
            <FormControlLabel
              control={
                <Checkbox
                  disabled
                  // checked={state.checkedB}
                  onChange={handleCheckBoxSubmit}
                  name="checkedB"
                  color="primary"
                />
              }
              label="Save"
              style={{ marginTop: "-60px", marginRight: "-15px" }}
            />
          )}
          <Grid item>
            <InputLabel></InputLabel>
            <Button
              onClick={(event) => handleSubmit(event)}
              variant="contained"
              color="primary"
              style={{ height: "40px", marginLeft: "-130px", width: "160px", marginTop: "38px" }}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
        <Grid sx={{ display: { xs: "none", md: "flex" } }}>
          {advancedOption === true ? (
            <div style={{ display: "flex", marginTop: "30px", marginLeft: "-75px" }}>
              <Grid item>
                <InputLabel htmlFor="longitude">Latitude</InputLabel>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  style={{ width: 325, marginTop: "15px" }}
                  name="latitude"
                  onChange={(e) => setLatidude(e.target.value)}
                  inputRef={latitudeVal}
                  defaultValue={defaultlatitude}
                />
              </Grid>
              {console.log(longitudeVal.current.value)}
              <Grid item style={{ marginLeft: "35px" }}>
                <InputLabel htmlFor="latitude">Longitude</InputLabel>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  style={{ width: 325, marginTop: "15px" }}
                  name="longitude"
                  onChange={(e) => setlongitude(e.target.value)}
                  inputRef={longitudeVal}
                  defaultValue={defaultlongitude ? defaultlongitude : longitudeVal.current.value}
                />
              </Grid>
              {console.log(timezone)}
              <Grid item style={{ marginLeft: "35px" }}>
                <InputLabel htmlFor="timeZone">Time Zone</InputLabel>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  style={{ width: 325, marginTop: "15px" }}
                  name="timeZone"
                  onChange={(e) => setTimeZone(e.target.value)}
                  defaultValue={defaulttimezone}
                />
              </Grid>
            </div>
          ) : null}
        </Grid>
      </div>
    </div>
  );
};

export default BirthDetailsForm;

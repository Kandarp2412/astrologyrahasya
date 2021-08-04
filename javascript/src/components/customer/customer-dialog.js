import PropTypes from "prop-types";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  NativeSelect,
  Select,
  TextField,
} from "@material-ui/core";
import { InputField } from "../input-field";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { setTokenSourceMapRange } from "typescript";
// import GlobalState from "../../contexts/GlobalState";
import { globalContext } from "../../contexts/Context";
import { useNavigate } from "react-router-dom";
import { LocalizationProvider, TimePicker } from "@material-ui/lab";
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
// import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import CreatableSelect from "react-select/creatable";

const countryOptions = ["USA", "Germany", "Spain", "Italy"];

export const CustomerDialog = (props) => {
  const { customer, open, onClose, ...other } = props;

  const {
    oneUser,
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

  const searchTime = useRef(0);

  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const [latitude, setLatidude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [value, setValue] = useState("");
  const [timezone, setTimeZone] = useState("");

  const [userSelectedChartType, setUserSelectedChartType] = useState("");

  const [editadvancedOption, setEditAdvancedOption] = useState(false);

  console.log(oneUser);

  const navigate = useNavigate();

  let { customerId } = useParams();

  // const [oneUser, setOneUser] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  let defaultOptionsyscat = [];
  const optionsys = useRef([]);

  const [syscatname, setsyscatname] = useState({
    isLoading: false,
    options1: defaultOptionsyscat,
    value: undefined,
  });

  let createOptionSysCat = (label) => ({
    label,
    value: label.toLowerCase().replace(/\W/g, ""),
  });

  for (let i of optionsys.current) {
    defaultOptionsyscat = [...defaultOptionsyscat, createOptionSysCat(i)];
  }
  const handleChangeSysCat = (newValue1, actionMeta) => {
    setsyscatname(newValue1.label);
    if (actionMeta.action == "create-option") {
      setsyscatname(newValue1);
      setAsset(asset.slice().concat(createOptionSysCat(newValue1.value)));
    }
  };

  const [asset, setAsset] = useState([]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      address: customer?.address || "",
      email: customer?.email || "",
      fullName: customer?.fullName || "",
      country: customer?.country || "",
      phone: customer?.phone || "",
      submit: null,
    },
    validationSchema: Yup.object().shape({
      address: Yup.string().max(255),
      email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
      fullName: Yup.string().max(255).required("Full name is required"),
      country: Yup.string().oneOf(countryOptions),
      phone: Yup.string().max(255),
    }),
    onSubmit: async (values, helpers) => {
      try {
        // console.log(name);
        axios
          .post(`http://localhost:9003/api/profile/update/${customerId}`, {
            name: name ? name : oneUser.name,
            email: email ? email : oneUser.email,
            phoneNumber: phone ? phone : oneUser.phoneNumber,
            birthPlace:
              locationVal.current !== null ? locationVal.current.value : oneUser.birthPlace,
            date: birthDateVal.current !== null ? birthDateVal.current.value : oneUser.date,
            time: birthTimeVal.current !== null ? birthTimeVal.current.value : oneUser.time,
            id: customerId,
            longitude: longitude ? longitude : oneUser.longitude,
            latitude: latitude ? latitude : oneUser.latitude,
            timezone: timezone ? timezone : oneUser.timezone,
            chartType: userSelectedChartType ? userSelectedChartType : "Netal",
          })
          .then(() => {
            toast.success(`Customer ${customer ? "updated" : "created"}`);
            navigate("/dashboard/customers");
            helpers.resetForm();
            helpers.setStatus({ success: true });
            helpers.setSubmitting(false);
          });
      } catch (err) {
        console.error(err);
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  const handleBirthPlace = (e) => {
    // console.log(e.target.value);
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
    val ? setLongitude(val.longitude) : setLongitude("");
  };

  const handleChangeChartType = (e) => {
    setUserSelectedChartType(e.target.value);
  };

  console.log(userSelectedChartType);

  // useEffect(() => {
  //   axios.post("http://localhost:9002/oneuserdata", { id: customerId }).then((res) => {
  //     // console.log(res.data.data[0].name);
  //     setOneUser(res.data.data[0]);
  //   });
  // }, []);

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

  console.log(oneUser);

  return (
    <Dialog
      onClose={onClose}
      open={open}
      TransitionProps={{
        onExited: formik.resetForm,
      }}
      {...other}
    >
      <DialogTitle>{customer ? "Update Customer" : "Create Customer"}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <InputField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Email address"
              name="email"
              onBlur={formik.handleBlur}
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              defaultValue={oneUser.email}
            />
          </Grid>
          <Grid item xs={12}>
            <InputField
              error={Boolean(formik.touched.fullName && formik.errors.fullName)}
              fullWidth
              helperText={formik.touched.fullName && formik.errors.fullName}
              label="Full Name"
              onBlur={formik.handleBlur}
              onChange={(e) => setName(e.target.value)}
              required
              defaultValue={oneUser.name}
            />
          </Grid>
          <Grid item xs={12}>
            <InputField
              error={Boolean(formik.touched.phone && formik.errors.phone)}
              fullWidth
              helperText={formik.touched.phone && formik.errors.phone}
              label="Phone number"
              name="phone"
              onBlur={formik.handleBlur}
              onChange={(e) => setPhone(e.target.value)}
              defaultValue={oneUser.phoneNumber}
            />
          </Grid>
          <Grid item xs={12}>
            <InputLabel htmlFor="name">Date of birth</InputLabel>
            <TextField
              fullWidth
              id="date"
              variant="outlined"
              // style={{ width: 270 }}
              size="small"
              type="date"
              defaultValue={oneUser.date}
              // sx={{
              //   display: {
              //     xs: "flex",
              //     md: {display:"flex",flexDirection:"column"},
              //   },
              // }}
              inputRef={birthDateVal}
            />
          </Grid>
          <Grid item xs={12}>
            <InputLabel htmlFor="name">Time of birth</InputLabel>
            <input
              // fullWidth
              defaultValue={oneUser.time}
              id="appt-time"
              type="time"
              name="appt-time"
              step="2"
              style={{
                height: "40px",
                marginTop: "15px",
                // maxWidth: "525px !important",
                width: "100%",
                // minWidth: "135px",
                borderRadius: "6px",
                outline: "midnightblue",
                border: "1px solid #C5C5C5",
                padding: "8px",
              }}
              // onChange={(e) => setUserBirthTime(e.target.value)}
              inputRef={birthTimeVal}
            />
          </Grid>
          {/* {console.log(oneUser.birthPlace)} */}
          <Grid item xs={12}>
            <InputLabel htmlFor="name">
              Birth Place{" "}
              <a href="#" onClick={(e) => setEditAdvancedOption(!editadvancedOption)}>
                +Advanced Options
              </a>
            </InputLabel>
            <Autocomplete
              fullWidth
              id="combo-box-demo"
              options={result}
              onChange={handleTextFeild} // prints the selected value
              // defaultValue={oneUser.birthPlace}
              getOptionLabel={(options) =>
                `${options.place} ,${options.state !== " " ? options.state : " "},${
                  options.country_name
                }`
              }
              // style={{ width: 32 }}
              onInputChange={handleBirthPlace}
              name="location"
              renderInput={(params) => (
                <TextField
                  {...params}
                  inputRef={locationVal}
                  placeholder={oneUser.birthPlace}
                  variant="outlined"
                  size="small"
                />
              )}
              // defaultValue={oneUser.birthPlace}
            />
            {/* </Grid> */}
            {editadvancedOption === true ? (
              <div style={{ marginTop: "30px" }}>
                <Grid item xs={12}>
                  <InputLabel htmlFor="longitude">Latitude</InputLabel>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    variant="outlined"
                    size="small"
                    style={{ width: "100%", marginTop: "15px" }}
                    name="latitude"
                    onChange={(e) => setLatidude(e.target.value)}
                    inputRef={latitudeVal}
                    defaultValue={oneUser.latitude}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel htmlFor="latitude">Longitude</InputLabel>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    variant="outlined"
                    size="small"
                    style={{ width: "100%", marginTop: "15px" }}
                    name="longitude"
                    onChange={(e) => setLongitude(e.target.value)}
                    inputRef={longitudeVal}
                    defaultValue={oneUser.longitude}
                  />
                </Grid>
                {console.log(longitudeVal)}
                <Grid item xs={12}>
                  <InputLabel htmlFor="timeZone">Time Zone</InputLabel>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    size="small"
                    style={{ width: "100%", marginTop: "15px" }}
                    name="timeZone"
                    onChange={(e) => setTimeZone(e.target.value)}
                    defaultValue={oneUser.timezone}
                  />
                </Grid>
              </div>
            ) : null}
          </Grid>
          <Grid item xs={12}>
            <FormControl style={{ width: "100%" }}>
              <InputLabel
                htmlFor="name-native-error"
                style={{ fontSize: "19px", marginLeft: "-14px" }}
              >
                Chart Type
              </InputLabel>
              <NativeSelect
                defaultValue="Netal"
                inputProps={{
                  name: "name",
                  id: "uncontrolled-native",
                }}
                onChange={(e) => handleChangeChartType(e)}
              >
                <option value="Netal">Netal</option>
                <option value="Event">Event</option>
                <option value="Horary">Horary</option>
              </NativeSelect>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <InputLabel htmlFor="name-native-error" style={{ fontSize: "19px" }}>
              Tags
            </InputLabel>
            <FormControl style={{ width: "100%", marginTop: "10px" }}>
              <CreatableSelect
                isClearable
                // placeholder="start typing"
                // defaultInputValue={name1.label}
                // onChange={handleChangeLocation}
                // options={defaultOptions1}
              />
            </FormControl>
          </Grid>
          {formik.errors.submit && (
            <Grid item xs={12}>
              <FormHelperText error>{formik.errors.submit}</FormHelperText>
            </Grid>
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={onClose} type="button" variant="outlined">
          Cancel
        </Button>
        <Button
          color="primary"
          disabled={formik.isSubmitting}
          onClick={formik.handleSubmit}
          type="submit"
          variant="contained"
        >
          {customer ? "Update" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

CustomerDialog.defaultProps = {
  open: false,
};

CustomerDialog.propTypes = {
  customer: PropTypes.object,
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

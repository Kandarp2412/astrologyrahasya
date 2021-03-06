import { useContext, useEffect, useRef, useState } from "react";
import Proptypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
import { format } from "date-fns";
import {
  Avatar,
  Box,
  Checkbox,
  Divider,
  IconButton,
  Link,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@material-ui/core";
import { Pagination } from "../pagination";
import { Star as StarIcon } from "../../icons/star";
import { ResourceError } from "../resource-error";
import { ResourceUnavailable } from "../resource-unavailable";
import { Scrollbar } from "../scrollbar";
import { CustomerMenu } from "./customer-menu";
import axios from "axios";
import moment from "moment";
import { globalContext } from "../../contexts/Context";

const columns = [
  {
    id: "fullName",
    disablePadding: true,
    label: "Name",
  },
  {
    id: "phone",
    label: "Phone",
  },
  {
    id: "email",
    label: "Email",
  },
  {
    id: "createdAt",
    label: "Birth Details",
  },
];

export const CustomersTable = (props) => {
  const {
    customers: customersProp,
    customersCount,
    error,
    isLoading,
    onPageChange,
    onSelect,
    onSelectAll,
    onSortChange,
    page,
    selectedCustomers,
    sort,
    sortBy,
  } = props;

  // console.log(views.map((i) => console.log(i.label)));

  const { refreshUserTable, setRefreshUserTable, selectedChartType, setSelectedChartType } =
    useContext(globalContext);

  const [customers, setCustomers] = useState(customersProp);

  const [userData, setUserData] = useState([]);

  const [favorite, setFavorite] = useState(true);

  // let favorite = useRef(false);

  const [favoriteUserId, setFavoriteUserId] = useState("");

  const [favoriteUser, setFavoriteUser] = useState();

  // const {selectedChartType, setSelectedChartType}=useContext(globalContext)

  useEffect(() => {
    setCustomers(customersProp);
  }, [customersProp]);

  const handleIsFavoriteChange = (customerId, value) => {
    setFavoriteUserId(customerId);
    setFavorite(!favorite);
    // favorite = !favorite;
    console.log(favorite);
    axios
      .post(`http://localhost:9003/api/profile/update/${customerId}`, { favorite: favorite })
      .then((res) => console.log(res.data.data));
    // const temp = [...customers];
    // console.log(temp);
    // const customerIndex = temp.findIndex((customer) => customer.id === customerId);
    // temp[customerIndex].isFavorite = value;
    // setCustomers(temp);
  };

  useEffect(() => {
    axios.get("http://localhost:9003/api/profile/get").then((res) => {
      // console.log(res.data.data);
      setUserData(res.data.data);
    });
  }, [refreshUserTable]);

  const displayLoading = isLoading;
  const displayError = Boolean(!isLoading && error);
  const displayUnavailable = Boolean(!isLoading && !error && !customers?.length);

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
      }}
    >
      <Scrollbar>
        <Table sx={{ minWidth: 1000 }}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={customers?.length > 0 && selectedCustomers.length === customers?.length}
                  disabled={isLoading}
                  indeterminate={
                    selectedCustomers.length > 0 && selectedCustomers.length < customers?.length
                  }
                  onChange={onSelectAll}
                />
              </TableCell>
              <TableCell />
              {columns.map((column) => (
                <TableCell key={column.id} padding={column.disablePadding ? "none" : "normal"}>
                  <TableSortLabel
                    active={sortBy === column.id}
                    direction={sortBy === column.id ? sort : "asc"}
                    disabled={isLoading}
                    onClick={(event) => onSortChange(event, column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {userData?.map((customer) => (
              <TableRow
                hover
                key={customer.id}
                selected={
                  !!selectedCustomers.find((selectedCustomer) => selectedCustomer === customer.id)
                }
              >
                {/* {console.log(customer.chartType, selectedChartType)} */}
                {customer.chartType === selectedChartType ? (
                  <>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={
                          !!selectedCustomers.find(
                            (selectedCustomer) => selectedCustomer === customer.id
                          )
                        }
                        onChange={(event) => onSelect(event, customer.id)}
                      />
                      {console.log(customer)}
                    </TableCell>
                    <TableCell padding="none">
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <IconButton
                          onClick={() => handleIsFavoriteChange(customer._id, !customer.isFavorite)}
                          size="small"
                        >
                          <StarIcon
                            sx={{
                              color: favoriteUser ? "rgb(255, 180, 0)" : "action.disabled",
                            }}
                          />
                        </IconButton>
                      </Box>
                    </TableCell>
                    <TableCell padding="none">
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {/* <Avatar
                      src={customer.avatar}
                      sx={{
                        height: 36,
                        mr: 1,
                        width: 36,
                      }}
                      variant="rounded"
                    /> */}
                        <Link
                          color="inherit"
                          component={RouterLink}
                          to="/dashboard/customers/1"
                          underline="none"
                          variant="subtitle2"
                        >
                          {customer.name}
                        </Link>
                      </Box>
                    </TableCell>
                    <TableCell>{customer.phoneNumber}</TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>
                      {moment(customer.date).format("DD/MM/yyyy")},{customer.time}
                      {/* {moment(customer.time).format("h:mm:ss")} */}
                      &ensp;{customer.birthPlace}
                      {/* {customer.date} */}
                    </TableCell>
                    <TableCell align="right">
                      <CustomerMenu customer={customer} />
                    </TableCell>
                  </>
                ) : null}
                {selectedChartType === "All" ? (
                  <>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={
                          !!selectedCustomers.find(
                            (selectedCustomer) => selectedCustomer === customer.id
                          )
                        }
                        onChange={(event) => onSelect(event, customer.id)}
                      />
                    </TableCell>
                    <TableCell padding="none">
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <IconButton
                          onClick={() => handleIsFavoriteChange(customer.id, !customer.isFavorite)}
                          size="small"
                        >
                          <StarIcon
                            sx={{
                              color: customer.isFavorite ? "rgb(255, 180, 0)" : "action.disabled",
                            }}
                          />
                        </IconButton>
                      </Box>
                    </TableCell>
                    <TableCell padding="none">
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {/* <Avatar
                      src={customer.avatar}
                      sx={{
                        height: 36,
                        mr: 1,
                        width: 36,
                      }}
                      variant="rounded"
                    /> */}
                        <Link
                          color="inherit"
                          component={RouterLink}
                          to="/dashboard/customers/1"
                          underline="none"
                          variant="subtitle2"
                        >
                          {customer.name}
                        </Link>
                      </Box>
                    </TableCell>
                    <TableCell>{customer.phoneNumber}</TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>
                      {moment(customer.date).format("DD/MM/yyyy")},{customer.time}
                      {/* {moment(customer.time).format("h:mm:ss")} */}
                      &ensp;{customer.birthPlace}
                      {/* {customer.date} */}
                    </TableCell>
                    <TableCell align="right">
                      <CustomerMenu customer={customer} />
                    </TableCell>
                  </>
                ) : null}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Scrollbar>
      {displayLoading && (
        <Box sx={{ p: 2 }}>
          <Skeleton height={42} />
          <Skeleton height={42} />
          <Skeleton height={42} />
        </Box>
      )}
      {displayError && (
        <ResourceError
          error={error}
          sx={{
            flexGrow: 1,
            m: 2,
          }}
        />
      )}
      {displayUnavailable && (
        <ResourceUnavailable
          sx={{
            flexGrow: 1,
            m: 2,
          }}
        />
      )}
      <Divider sx={{ mt: "auto" }} />
      <Pagination
        disabled={isLoading}
        onPageChange={onPageChange}
        page={page}
        rowsCount={customersCount}
      />
    </Box>
  );
};

CustomersTable.defaultProps = {
  customers: [],
  customersCount: 0,
  page: 1,
  selectedCustomers: [],
  sort: "desc",
  sortBy: "createdAt",
};

CustomersTable.propTypes = {
  // views: Proptypes.array,
  customers: Proptypes.array,
  customersCount: Proptypes.number,
  error: Proptypes.string,
  isLoading: Proptypes.bool,
  onPageChange: Proptypes.func,
  onSelect: Proptypes.func,
  onSelectAll: Proptypes.func,
  onSortChange: Proptypes.func,
  page: Proptypes.number,
  selectedCustomers: Proptypes.array,
  sort: Proptypes.string,
  sortBy: Proptypes.string,
};

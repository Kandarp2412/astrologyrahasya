import PropTypes from "prop-types";
import { formatDistanceToNowStrict } from "date-fns";
import { Avatar, Box, Button, Card, Typography } from "@material-ui/core";
import { globalContext } from "../../contexts/Context";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export const CustomerNote = (props) => {
  const { content, createdAt, id, onDelete, senderAvatar, senderName, deletable, sx, ...other } =
    props;

  const [allNotes, setAllNotes] = useState([]);

  let { customerId } = useParams();

  const { oneUser } = useContext(globalContext);

  // console.log(oneUser);

  useEffect(() => {
    axios.post(`http://localhost:9003/api/profile/allnotes/${customerId}`).then((res) => {
      console.log("hii");
      // console.log(res.data.data[0].notes);
      setAllNotes(res.data.data);
    });
  });
  console.log(allNotes);

  return (
    <div>
      {console.log(content)}
      {allNotes &&
        allNotes.map((i) => {
          return (
            <>
              <Card
                sx={{
                  display: "flex",
                  p: 3,
                  ...sx,
                }}
                variant="outlined"
                {...other}
              >
                <Box
                  sx={{
                    flex: 1,
                    ml: 2,
                  }}
                >
                  <Typography color="textPrimary" variant="h6">
                    {oneUser.name}
                  </Typography>
                  <Typography color="textPrimary" sx={{ my: 1 }} variant="body2">
                    {i.notes}
                  </Typography>
                  <Box
                    sx={{
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    <Typography color="textSecondary" variant="caption">
                      {`${formatDistanceToNowStrict(createdAt)} ago`}
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Button
                      color="primary"
                      onClick={() => console.log(id)}
                      size="small"
                      variant="text"
                    >
                      Edit
                    </Button>
                    <Button
                      color="primary"
                      onClick={() => onDelete?.(id)}
                      size="small"
                      variant="text"
                    >
                      Delete
                    </Button>
                    {/* )} */}
                  </Box>
                </Box>
              </Card>
            </>
          );
        })}
    </div>
  );
};

CustomerNote.propTypes = {
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.instanceOf(Date).isRequired,
  deletable: PropTypes.bool,
  id: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
  senderAvatar: PropTypes.string.isRequired,
  senderName: PropTypes.string.isRequired,
  sx: PropTypes.object,
};

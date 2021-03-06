// React imports
import React, { useEffect } from "react";
// Component imports
import MyEventCard from "./MyEventCard";
// GraphQL/Apollo imports
import { useQuery } from "react-apollo";
import { GET_USER_EVENTS } from "./queries";
// Auth0 imports
import { useAuth0 } from "../../config/react-auth0-spa";
// Styling imports
import { makeStyles, Grid, Box, Typography } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles({
  root: {
    maxWidth: "100%",
    width: "90%",
    fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"],
  },
  headingBox: {
    margin: "6rem 0 2rem 3rem",
    fontWeight: "400",
    borderColor: "#D3D3D3",
  },
  grid: {
    display: "flex",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    marginLeft: "3rem",
  },
  loadingSpinner: {
    position: "absolute",
    top: "50%",
    right: "50%",
    color: "#2962FF",
  },
  noActiv: {
    marginLeft: "3rem",
  },
  noActivBlue: {
    marginLeft: "3rem",
    color: "#2962FF",
  },
  inlineNotice: {
    display: "inline-flex",
  },
});

export default function MyEvents() {
  const classes = useStyles();
  // Retrieves logged in user info
  const { user } = useAuth0();
  // Retrieves all events a user is registered to
  const { error, loading, data, refetch } = useQuery(GET_USER_EVENTS, {
    variables: { email: user.email },
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (loading) return <CircularProgress className={classes.loadingSpinner} />;
  if (error) return `Error! ${error.message}`;
  return (
    <main className={classes.root}>
      <Box className={classes.headingBox} borderBottom={2}>
        <Typography className={classes.heading} variant="h1" gutterBottom>
          My Events
        </Typography>
      </Box>
      {data.events.length >= 1 ? (
        <Grid className={classes.grid}>
          {data &&
            data?.events?.map((event, id) => (
              <MyEventCard key={id} event={event} refetch={refetch} />
            ))}
        </Grid>
      ) : (
        <>
          <Typography className={classes.noActiv}>
            You haven't registered for any events yet!
          </Typography>
          <Box className={classes.inlineNotice}>
            <Typography className={classes.noActivBlue}>
              Check out the Events Calendar
            </Typography>
            <Typography>
              , register for an event, then see all of your registered events
              here!
            </Typography>
          </Box>
        </>
      )}
    </main>
  );
}

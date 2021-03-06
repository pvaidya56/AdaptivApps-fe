import React from "react";
import config from "../../../config/auth_config";

// Auth0 imports
import { useAuth0 } from "../../../config/react-auth0-spa";

// Subscription Imports
import { useQuery } from "react-apollo";
import { CHAT_SUBSCRIPTION, GET_MESSAGES } from '../../../pages/Chat/queries/Chats';
import { ANNOUNCEMENT_SUBSCRIPTION, GET_ANNOUNCEMENTS } from '../../../pages/Chat/queries/Announcements'
import { GET_CHAT_ROOMS } from '../../../pages/Chat/queries/ChatRooms';
import { GET_USER_PROFILE } from '../../../pages/MyEventDetails/queries/index';
import { NOTIFICATION_SUBSCRIPTION, GET_NOTIFICATIONS } from '../../../pages/Chat/queries/Notifications';

// Styling imports
import { withStyles } from '@material-ui/core/styles';

import NavLink from "./NavLink";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import BookmarkIcon from "@material-ui/icons/BookmarkBorder";
import HomeIcon from "@material-ui/icons/HomeOutlined";
import UserIcon from "@material-ui/icons/PersonOutlineOutlined";
import GroupIcon from "@material-ui/icons/GroupAddOutlined";
import MenuIcon from "@material-ui/icons/Menu";
import ForumOutlinedIcon from '@material-ui/icons/ForumOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import Badge from '@material-ui/core/Badge';
import {
  makeStyles,
  useTheme,
  Box,
  Drawer,
  Hidden,
  IconButton,
  Toolbar,
  Button,
} from "@material-ui/core";
import { IconContext } from "react-icons";
import { FiLogOut } from "react-icons/fi";
import acsLogo from "../../../assets/images/acsLogo.png";

const drawerWidth = "25rem";

const StyledBadge = withStyles((theme) => ({
  badge: {
    left: 0,
    top: 10,
    width: '2%', 
    backgroundColor: '#052942',
    color: 'white',
    fontSize: '1.25rem'
  },
}))(Badge);

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    border: "none",
  },
  navPaper: {
    border: "none",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  drawerPaper: {
    width: drawerWidth,
    border: "none",
    boxShadow:
      "0px 1px 3px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.12), 0px 0px 2px rgba(0, 0, 0, 0.14)",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  imgBox: {
    width: drawerWidth,
    marginTop: "5rem",
    "& img": {
      width: drawerWidth,
    },
  },
  navContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    margin: "0 auto",
    width: "98%",
  },
  navLink: {
    textDecoration: "none",
    height: "5rem",
    display: "flex",
    alignContent: "flex-start",
    alignItems: "center",
    margin: ".5rem auto",
    textAlign: "left",
    "& p": {
      fontSize: "1.6rem",
    },
  },
  disabledNavLink: {
    textDecoration: "none",
    height: "5rem",
    display: "flex",
    alignContent: "flex-start",
    alignItems: "center",
    margin: ".5rem 0",
    textAlign: "left",
    "& p": {
      fontSize: "1.6rem",
    },
    "&:hover": {
      cursor: 'pointer'
    }
  },
  logoutContainer: {
    display: "flex",
    alignSelf: "flex-start",
    alignItems: "flex-end",
    width: "100%",
    height: "100%",
    "& p": {
      fontSize: "1.6rem",
    },
  },
  logoutBtn: {
    display: "flex",
    justifyContent: "flex-start",
    margin: "0 0 2rem 0",
    textTransform: "none",
    width: "100%",
  },
  logoutIcon: {
    color: "#2962FF",
    margin: "0 1rem 0 3rem",
    fontSize: "2.5rem",
  },
  navIcon: {
    margin: "0 1rem 0 3rem",
    fontSize: "2.5rem",
  },
  iconActive: {
    color: "#FFFFFF",
  },
  logoutP: {
    color: "#2962FF",
  },
}));

function SideNav(props) {
  const { user } = props;
  const { logout } = useAuth0();
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  // Setup Chat and Announcement Subscriptions
  const { refetch } = useQuery(GET_CHAT_ROOMS, { variables: { email: user.email } });
  const { subscribeToMore: announcementSubscription, refetch: refetchAnnouncements  } = useQuery(GET_ANNOUNCEMENTS, { variables: { isAnnouncementRoom: true } });
  const { subscribeToMore } = useQuery(GET_MESSAGES, { variables: { email: user.email } });
  const { data, refetch: refetchProfile } = useQuery(GET_USER_PROFILE, { variables: { email: user.email } });
  const { subscribeToMore: notificationSubscription } = useQuery(GET_NOTIFICATIONS, { variables: { email: user.email } });

  // Chat Subscription
  const _subscribeToNewChats = subscribeToMore => {
    subscribeToMore({
      document: CHAT_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev
        const chat = subscriptionData.data.chat
        refetch();
        refetchProfile();
        return Object.assign({}, prev, {
          profile: {
            chats: [chat, ...prev.profile.chats],
            __typename: prev.profile.__typename
          }
        })
      }
    })
  };

  // Announcement Subscription
  const _subscribeToNewAnnouncements = announcementSubscription => {
    announcementSubscription({
      document: ANNOUNCEMENT_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev
        const announcement = subscriptionData.data.announcement
        refetchAnnouncements();
        refetchProfile();
        return Object.assign({}, prev, {
          announcements: [announcement, ...prev.announcements],
          __typename: prev.__typename
        })
      }
    })
  };

  _subscribeToNewAnnouncements(announcementSubscription);

  // Notification Subscription
  const _subscribeToNewNotifications = notificationSubscription => {
    notificationSubscription({
      document: NOTIFICATION_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev
        const notification = subscriptionData.data.notification
        refetch();
        refetchAnnouncements();
        refetchProfile();
        return Object.assign({}, prev, {
          profile: {
            notifications: [notification, ...prev.profile.notifications],
            __typename: prev.profile.__typename
          }
        })
      }
    })
  };
  _subscribeToNewNotifications(notificationSubscription);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <>
      <Box className={classes.imgBox}>
        <img src={acsLogo} alt="ACS Logo" />
      </Box>
      <Box className={classes.navContainer}>
        <NavLink to="calendar" className={classes.navLink}>
          <CalendarTodayIcon className={classes.navIcon} />
          <p>Events Calendar</p>
        </NavLink>
        <NavLink to="myevents" className={classes.navLink}>
          <BookmarkIcon className={classes.navIcon} />
          <p>My Events</p>
        </NavLink>
        <NavLink to="/" className={classes.navLink}>
          <UserIcon className={classes.navIcon} />
          <p>My Profile</p>
        </NavLink>
        {data === undefined || data.profile === null || (data && (data?.profile.firstName === null || data?.profile.lastName === null)) ? 
        (
          <Tooltip title="Please complete your profile information to access Chats">
            <div className={classes.disabledNavLink}>
            {(data && data.profile !== null) && (data && data?.profile.notifications.length > 0) ? (
                <StyledBadge
                 overlap='circle'
                 badgeContent={data.profile.notifications.length}>
                  <ForumOutlinedIcon className={classes.navIcon} />
                </StyledBadge>
              ) : (
                <ForumOutlinedIcon className={classes.navIcon} />
              )}
              <p>Chats</p>
            </div>
          </Tooltip>
        ) 
        : 
        (
          <NavLink to="/chats" className={classes.navLink}>
            {data && data?.profile.notifications.length > 0 ? (
              <StyledBadge 
              overlap='circle'
              badgeContent={data.profile.notifications.length}
              >
                <ForumOutlinedIcon className={classes.navIcon} />
              </StyledBadge>
            ) : (
              <ForumOutlinedIcon className={classes.navIcon} />
            )}
            <p>Chats</p>
          </NavLink>
        )}
        {user && user[config.roleUrl].includes("Admin") ? (
          <>
            <NavLink to="manage" className={classes.navLink}>
              <HomeIcon className={classes.navIcon} />
              <p>Manage Events</p>
            </NavLink>
            <NavLink to="users" className={classes.navLink}>
              <GroupIcon className={classes.navIcon} />
              <p>Manage Users</p>
            </NavLink>
          </>
        ) : null}
      </Box>
      <Box className={classes.logoutContainer}>
        <Button className={classes.logoutBtn} onClick={() => logout()}>
          <IconContext.Provider
            value={{ style: { transform: "rotate(180deg)" } }}
          >
            <FiLogOut className={classes.logoutIcon} />
            <p className={classes.logoutP}>Log Out</p>
          </IconContext.Provider>
        </Button>
      </Box>
    </>
  );

  return (
    <div className={classes.root}>
      <Toolbar position="fixed">
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          className={classes.menuButton}
        >
          <MenuIcon className={classes.navIcon} />
        </IconButton>
      </Toolbar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
}


export default SideNav;

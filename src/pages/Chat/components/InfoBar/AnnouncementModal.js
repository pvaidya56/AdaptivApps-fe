import React, {useEffect, useState} from "react";
import { useQuery } from "react-apollo";

//Style imports
import {
    makeStyles,
    Button,
    Icon,
    Box,
    TextField,
    MenuItem

  } from "@material-ui/core";
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles(theme => ({
    span: {
      fontSize: '2rem',
      color: 'grey',
      cursor: 'pointer'
    },
      modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: "-webkit-xxx-large",
      },
      paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
  }));

  function AnnouncementModal(props) {
    const { user } = props;
    const classes = useStyles();
    const [NewAnnouncement, setNewAnnouncement] = useState([]);
    
    const handleChange = e => {
      setNewAnnouncement(e.target.value);
    };
    const onSubmit = e => {
        console.log(NewAnnouncement, "New Announcement");
    }

 
      return (
        <div>          
                <div className={classes.paper}>
                  <h2 id="transition-modal-title" className={classes.span}>Create New Announcement</h2>
                    {/* Search for Recipients functionality */}
                    <div>       
    
                     <Box component="div">
                      <TextField
                        variant="outlined"
                        type="text"
                        placeholder="Create New Announcement"
                        name="announcement"
                        value={NewAnnouncement}
                        onChange={handleChange}
                        />
                             
                                  </Box>
                    
                    </div>
                </div>
        </div>
             )
  }
  
  export default AnnouncementModal;
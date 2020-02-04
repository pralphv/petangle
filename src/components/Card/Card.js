import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import SentimentSatisfiedAltIcon from "@material-ui/icons/SentimentSatisfiedAlt";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCat,
  faDog
} from "@fortawesome/free-solid-svg-icons";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    "&:hover": {
      background: "#F2F8F8"
    },
    background: "#fff",
    cursor: "pointer",
    maxWidth: 280
  },
  icon: {
    margin: "auto",
    display: "block",
    height: "100%",
    paddingRight: theme.spacing(2)
  },
  likeIcon: {
    color: "#CE6B44"
  },
  dislikeIcon: {
    color: "#004DAA"
  },
  catIcon: {
    color: "#004DAA"
  },
  dogIcon: {
    color: "#004DAA"
  },
  
}));


function Card({ title, subtitle, icon, handleOnClick, label }) {
  const classes = useStyles();
  const iconMap = {
    like: {icon: SentimentSatisfiedAltIcon, class: classes.likeIcon},
    dislike: {icon: SentimentVeryDissatisfiedIcon, class: classes.dislikeIcon},
    Cat: {icon: faCat, class: classes.catIcon},
    Dog: {icon: faDog, class: classes.dogIcon},
  };
  
  const Icon = iconMap[icon].icon;
  const classToUse = iconMap[icon].class;
  const useFontAwesome = ["like", "dislike"].includes(icon) ? false : true;

  return (
    <div className={classes.root}>
      <Grid container spacing={2} onClick={handleOnClick}>
        <Grid item xs={2}>
          {useFontAwesome ? (
            <FontAwesomeIcon icon={Icon} className={`${classes.icon} ${classToUse}`} />
          ) : (
            <Icon className={`${classes.icon} ${classToUse}`} />
          )}
        </Grid>
        <Grid item xs={10} sm container >
          <Grid item xs container direction="column" spacing={2}>
            <Grid item >
              <Typography  variant="subtitle2">
                {title}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
              >
                {subtitle}
              </Typography>
            </Grid>
          </Grid>
          {label && (
            <Grid >
              <Typography variant="caption" color="textSecondary">
                {label}
              </Typography>
            </Grid>
          )}
        </Grid>
      </Grid>
    </div>
  );
}
Card.propTypes = {
  handleOnClick: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired
};

export default Card;

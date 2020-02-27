import React from "react";
import PropTypes from "prop-types";

import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

const TEXT = {
  saved:{
    en: "Saved",
    zh: "已儲存",
    jp: "保存した"
  },
  save:{
    en: "Save",
    zh: "儲存",
    jp: "保存する"
  },
}

function SaveButton({ isSaved, handleOnClick, locale }) {
  return (
    <Typography>
      <IconButton
        onClick={handleOnClick}
        aria-label="save"
        size="small"
        style={{ fontSize: 17, width: 100  }}
      >
        <PlaylistAddIcon /> {isSaved ? TEXT.saved[locale] : TEXT.save[locale]}
      </IconButton>
    </Typography>
  );
}

SaveButton.propTypes = {
  isSaved: PropTypes.bool.isRequired,
  locale: PropTypes.string,
  handleOnClick: PropTypes.func.isRequired
};

export default SaveButton;

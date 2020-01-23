import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

// const actions = [
//   { icon: <PetsIcon />, name: "Add Pet" },
//   { icon: <LocalDiningIcon />, name: "Add Product" }
// ];
export default function SaveButton({ isSaved, handleOnClick }) {
  return (
    <Typography>
      <IconButton
        onClick={handleOnClick}
        aria-label="save"
        size="small"
        style={{ fontSize: 17 }}
      >
        <PlaylistAddIcon /> {isSaved ? "Saved" : "Save"}
      </IconButton>
    </Typography>
  );
}

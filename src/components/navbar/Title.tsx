import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { NavClassesProps } from "../../types/utils";


const Title:React.VFC<NavClassesProps> = ({ classes }) => {
	
  return (
    <Typography variant="h5" className={classes.title}>
      <Link to={"/"} className={classes.anchor}>
        Simple Ecommerce
      </Link>
    </Typography>
  );
};

export default Title;

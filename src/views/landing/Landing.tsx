import {CssBaseline, Typography} from "@mui/material";
import './Landing.css';

export const Landing = () => {
  return (
    <div className="bg">
      <CssBaseline/>
      <div>
        <Typography component="h1" variant="h1">
          Hello. This is Pluto.
        </Typography>
        <img src="logo_proto.png"/>
      </div>
    </div>
  )
}
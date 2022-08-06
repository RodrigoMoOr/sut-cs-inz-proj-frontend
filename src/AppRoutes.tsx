import {Route, Routes} from "react-router-dom";
import {SignUp} from "./views/SignUp";

export const AppRoutes = () => {
  return(
    <Routes>
      <Route path="sign-up" element={<SignUp />} />
    </Routes>
  )
}
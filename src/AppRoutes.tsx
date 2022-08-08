import {Route, Routes} from "react-router-dom";
import {SignUp} from "./views/SignUp";
import {Landing} from "./views/landing/Landing";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Landing/>}/>
      <Route path="sign-up" element={<SignUp/>}/>
    </Routes>
  )
}
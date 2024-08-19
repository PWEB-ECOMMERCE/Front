import { createTheme } from "@mui/material/styles";

let theme = createTheme({
 palette: {
   primary: {
     lighter: "#FFFFFF",
     main: "#a0a0a0",
     dark: "#404040",
   },
   secondary: {
     main: "#246BA2",
   },
   button: {
     buttonFlashy:"#0996ff",
     buttonModest:"#eeeeee",
   }
 },
})
export default theme;

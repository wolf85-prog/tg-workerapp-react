import './App.css';
import {Route, Routes} from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import NewWorker from "./pages/NewWorker/NewWorker";
import NewWorker2 from "./pages/NewWorker2/NewWorker2";
import NewWorker3 from "./pages/NewWorker3/NewWorker3";
import NewWorker4 from "./pages/NewWorker4/NewWorker4";

function App() {

  const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
  });


  return (
      <ThemeProvider theme={darkTheme}>
          <CssBaseline />
              <Routes>
                  <Route index element={<NewWorker />}/>
                  <Route path={'add-worker'} element={<NewWorker2 />}/>
                  <Route path={'add-worker3'} element={<NewWorker3 />}/>
                  <Route path={'add-worker4'} element={<NewWorker4 />}/>
              </Routes>
      </ThemeProvider>
  );
}

export default App;

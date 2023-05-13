import './App.css';
import {Route, Routes} from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import NewWorker from "./pages/NewWorker/NewWorker";

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
                  <Route path={'add-worker'} element={<NewWorker />}/>
              </Routes>
      </ThemeProvider>
  );
}

export default App;

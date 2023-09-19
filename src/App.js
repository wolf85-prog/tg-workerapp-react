import './App.css';
import {Route, Routes} from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import LoadPage from "./pages/LoadPage/LoadPage";
import NewWorker from "./pages/NewWorker/NewWorker";
import NewWorker2 from "./pages/NewWorker2/NewWorker2";
import NewWorker3 from "./pages/NewWorker3/NewWorker3";
import NewWorker4 from "./pages/NewWorker4/NewWorker4";

import Page1 from "./pages/Page1/Page1";
import Page2 from "./pages/Page2/Page2";
import Page3 from "./pages/Page3/Page3";
import Page4 from "./pages/Page4/Page4";
import Page5 from "./pages/Page5/Page5";
import Page6 from "./pages/Page6/Page6";

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
                  <Route index element={<LoadPage />}/>
                  <Route path={'add-worker'} element={<NewWorker />}/>
                  <Route path={'add-worker2'} element={<NewWorker2 />}/>
                  <Route path={'add-worker3'} element={<NewWorker3 />}/>
                  <Route path={'add-worker4'} element={<NewWorker4 />}/>

                  <Route path={'page1'} element={<Page1 />}/>
                  <Route path={'page2'} element={<Page2 />}/>
                  <Route path={'page3'} element={<Page3 />}/>
                  <Route path={'page4'} element={<Page4 />}/>
                  <Route path={'page5'} element={<Page5 />}/>
                  <Route path={'page6'} element={<Page6 />}/>
              </Routes>
      </ThemeProvider>
  );
}

export default App;

import './App.css';
import {Route, Routes} from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import LoadPage from "./pages/LoadPage/LoadPage";
import NewWorker from "./pages/NewWorker/NewWorker";
import NewWorker2 from "./pages/NewWorker2/NewWorker2";
import NewWorker3 from "./pages/NewWorker3/NewWorker3";
import NewWorker4 from "./pages/NewWorker4/NewWorker4";
import MenuPage from './pages/MenuPage/MenuPage';
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import ProjectPage from "./pages/ProjectPage/ProjectPage";
import Page3 from "./pages/Page3/Page3";
import ContactPage from "./pages/ContactPage/ContactPage";
import Page5 from "./pages/Page5/Page5";
import Page6 from "./pages/Page6/Page6";
import HelloPage from './pages/HelloPage/HelloPage';

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
                  <Route path={'hello'} element={<HelloPage />}/>
                  <Route path={'menu'} element={<MenuPage />}/>
                  <Route path={'add-worker'} element={<NewWorker />}/>
                  <Route path={'add-worker2'} element={<NewWorker2 />}/>
                  <Route path={'add-worker3'} element={<NewWorker3 />}/>
                  <Route path={'add-worker4'} element={<NewWorker4 />}/>

                  <Route path={'profile'} element={<ProfilePage />}/>
                  <Route path={'projects'} element={<ProjectPage />}/>
                  <Route path={'page3'} element={<Page3 />}/>
                  <Route path={'contacts'} element={<ContactPage />}/>
                  <Route path={'page5'} element={<Page5 />}/>
                  <Route path={'page6'} element={<Page6 />}/>
              </Routes>
      </ThemeProvider>
  );
}

export default App;

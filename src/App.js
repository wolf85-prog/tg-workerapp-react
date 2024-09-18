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
import SmetaPage from "./pages/SmetaPage/SmetaPage";
import FaqPage from "./pages/FaqPage/FaqPage";
import HelloPage from './pages/HelloPage/HelloPage';
import InfoPage from './pages/InfoPage/InfoPage';
import InfoPage1 from './pages/InfoPage1/InfoPage1';
import StavkiPage from './pages/StavkiPage/StavkiPage';
import ProcessPage from './pages/ProcessPage/ProcessPage';
import NewPassport from './pages/NewPassport/NewPassport';
import NewPassport2 from './pages/NewPassport2/NewPassport2';
import NewPassport3 from './pages/NewPassport3/NewPassport3';
import AnketaPage from './pages/AnketaPage/AnketaPage';
import NewStavka from './pages/NewStavka/NewStavka';
import EditWorker from './pages/EditWorker/EditWorker';
import LoadPage2 from "./pages/LoadPage2/LoadPage2";

import ErrorPage from "./pages/ErrorPage/ErrorPage";

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
                  <Route path={'load'} element={<LoadPage2 />}/>
                  <Route path={'hello'} element={<HelloPage />}/>
                  <Route path={'menu'} element={<MenuPage />}/>
                  <Route path={'add-worker'} element={<NewWorker />}/>
                  <Route path={'add-worker2'} element={<NewWorker2 />}/>
                  <Route path={'add-worker3'} element={<NewWorker3 />}/>
                  <Route path={'add-worker4'} element={<NewWorker4 />}/>
                  <Route path={'process'} element={<ProcessPage />}/>
                  <Route path={'error'} element={<ErrorPage />}/>

                  <Route path={'anketa'} element={<AnketaPage />}/>
                  <Route path={'add-passport'} element={<NewPassport />}/>
                  <Route path={'add-passport2'} element={<NewPassport2 />}/>
                  <Route path={'add-passport3'} element={<NewPassport3 />}/>

                  <Route path={'error'} element={<ErrorPage />}/>
                  <Route path={'profile'} element={<ProfilePage />}/>
                  <Route path={'projects'} element={<ProjectPage />}/>
                  <Route path={'smeta'} element={<SmetaPage />}/>
                  <Route path={'page3'} element={<Page3 />}/>
                  <Route path={'contacts'} element={<ContactPage />}/>
                  <Route path={'info'} element={<InfoPage />}/>
                  <Route path={'info1'} element={<InfoPage1 />}/>
                  <Route path={'faq'} element={<FaqPage />}/>
                  <Route path={'stavki'} element={<StavkiPage />}/>

                  <Route path={'add-stavka/:id'} element={<NewStavka />}/>

                  <Route path={'edit-worker'} element={<EditWorker />}/>
              </Routes>
      </ThemeProvider>
  );
}

export default App;

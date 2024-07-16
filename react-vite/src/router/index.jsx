import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import MuseumHomePage from '../components/MuseumHomePage';
import ExhibitionDetail from '../components/ExhibitionDetailPage';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <MuseumHomePage/>
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "exhibitions/:id",
        element: <ExhibitionDetail />

      },
    ],
  },
]);
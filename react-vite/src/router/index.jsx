import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import MuseumHomePage from '../components/MuseumHomePage';
import ExhibitionDetail from '../components/ExhibitionDetailPage';
import StoreHomePage from '../components/StoreHomePage'
import ItemDetailPage from '../components/ItemDetailPage';
import MembershipsPage from '../components/MembershipsPage';
import ManageReviews from '../components/ManageReviews';
import MembershipDetails from '../components/MembershipDetails';
import Cart from '../components/Cart'
import TicketsPage from '../components/TicketsPage/TicketsPage';
import PurchasesPage from '../components/PurchasesPage/PurchasesPage';
import EditAdmissionPurchase from '../components/EditAdmissionPurchase';


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
      {
        path:"store",
        element: <StoreHomePage/>
      },
      {
        path:"store/items/:id",
        element: <ItemDetailPage />
      },
      {
        path:'/memberships',
        element: <MembershipsPage />
      },
      {
        path: 'user/reviews',
        element: <ManageReviews />

      },
      {
        path: 'user/membership',
        element: <MembershipDetails/>

      },
      {
        path: "cart",
        element: <Cart />
      },
      {
        path: "tickets",
        element: <TicketsPage/>

      },
      {
        path:'user/purchases/:id/edit',
        element: <EditAdmissionPurchase />
      },
      {
        path: 'user/purchases',
        element: <PurchasesPage />
      },
    ],
  },
]);
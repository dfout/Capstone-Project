import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ModalProvider, Modal } from "../context/Modal";
import { thunkAuthenticate } from "../redux/session";
import { getUserMembershipThunk } from "../redux/member";
import Navigation from "../components/Navigation/Navigation";
import Footer from '../components/Footer'

export default function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(thunkAuthenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  useEffect(()=>{
    dispatch(getUserMembershipThunk())
  },[dispatch])

  return (
    <>
      <ModalProvider>
        <Navigation />
        {isLoaded && <Outlet />}
        <Footer />
        <Modal />
      </ModalProvider>
    </>
  );
}

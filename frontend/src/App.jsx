import { useEffect } from 'react';
import './App.css'
import Login from './Page/Login'
import api from './Utiles/axios'
import { useDispatch } from "react-redux";
import { setUserData } from './Redux/userSlice';
function App() {
  const dispatch = useDispatch();

  const getCurrentUser = async () => {
    try {

      const { data } = await api.get("/api/auth/me");
      dispatch(setUserData(data));
    } catch (error) {
      console.log(error);
      dispatch(setUserData(null));
    }
  }

  useEffect(() => {
    getCurrentUser();
  }, [dispatch])


  return (
    <> <Login /></>
  )
}

export default App

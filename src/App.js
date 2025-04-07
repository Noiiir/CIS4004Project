import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './components/VideogameDatabase';
import HomePage from "./components/HomePage";
import GameCopiesFront from './components/GameCopiesFront';
import DatabaseDisplay from './components/DatabaseDisplay';
import CreateConsole from './components/CreateConsole';
import AddData from './components/AddData';
import About from './components/About';
import ProtectedRoute from './components/ProtectedRoute';
import NavBar from './components/NavBar';
import { useAuth0 } from '@auth0/auth0-react';
import { AuthProvider } from './auth/AuthProvider';


const Layout = ({ children }) => {
  const { isAuthenticated } = useAuth0();
  
  return (
    <>
      {isAuthenticated && <NavBar />}
      {children}
    </>
  );
};

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout><Login /></Layout>
    },
    {
      path: "/home",
      element: <Layout><ProtectedRoute><HomePage /></ProtectedRoute></Layout>
    },
    {
      path: "/signup",
      element: <Layout><Login /></Layout>
    },
    {
      path: "/gamecopiesfront",
      element: <Layout><ProtectedRoute><GameCopiesFront /></ProtectedRoute></Layout>
    },
    {
      path: "/databasedisplay",
      element: <Layout><ProtectedRoute><DatabaseDisplay /></ProtectedRoute></Layout>
    },
    {
      path: "/createconsole",
      element: <Layout><ProtectedRoute><CreateConsole /></ProtectedRoute></Layout>
    },
    {
      path: "/adddata",
      element: <Layout><ProtectedRoute><AddData /></ProtectedRoute></Layout>
    },
    {
      path: "/about",
      element: <Layout><About /></Layout>
    }
  ]);

  return (<AuthProvider> 
  <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
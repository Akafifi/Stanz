import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ErrorPage from './pages/Error';

import SearchArtist from './components/SearchArtist.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div style={{ backgroundColor: 'orange', height: '100vh' }}>
        <App />
      </div>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />, // Including the home component here
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
      {
        path: '/profiles/:profileId',
        element: <Profile />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />,
);

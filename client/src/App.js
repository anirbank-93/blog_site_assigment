import { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import DataProvider from './context/DataProvider';

// Components
import Login from './components/account/Login';
import Home from './components/home/Home';
import Header from './components/header/Header';
import CreatePost from './components/create/CreatePost';
import PostDetails from './components/home/post/PostDetails';
import UpdatePost from './components/create/UpdatePost';

const PrivateRoute = ({ authenticated, ...props }) => {
  return authenticated ? (
    <>
      <Header />
      <Outlet />
    </>
  ) : (
    <Navigate replace to="/" />
  );
};

function App() {
  const [authenticated, isAuthenticated] = useState(localStorage.getItem('login'));

  return (
    <>
      <Toaster />

      <DataProvider>
        <BrowserRouter>
          <div className="App" style={{ marginTop: 64 }}>
            <Routes>
              <Route
                path="/"
                element={<Login isAuthenticated={isAuthenticated} />}
              />

              <Route
                path="/"
                element={<PrivateRoute authenticated={authenticated} />}
              >
                <Route path="/home" element={<Home />} />
              </Route>

              <Route
                path="/create"
                element={<PrivateRoute authenticated={authenticated} />}
              >
                <Route path="/create" element={<CreatePost />} />
              </Route>

              <Route
                path="/post-details/:id"
                element={<PrivateRoute authenticated={authenticated} />}
              >
                <Route path="/post-details/:id" element={<PostDetails />} />
              </Route>

              <Route
                path='/update/:id'
                element={<PrivateRoute authenticated={authenticated} />}
              >
                <Route path='/update/:id' element={<UpdatePost />} />
              </Route>
            </Routes>
          </div>
        </BrowserRouter>
      </DataProvider>
    </>
  );
}

export default App;

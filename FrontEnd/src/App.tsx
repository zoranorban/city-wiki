import { BrowserRouter, Routes, Route } from "react-router-dom";

import UserContextProvider from "./context/UserContext";
import HomePage from "./pages/HomePage";
import CitiesPage from "./pages/CitiesPage";
import Layout from "./components/Layout";

import "./styles/App.scss";
import CityDetailPage from "./pages/CityDetailPage";
import UsersPage from "./pages/UsersPage";
import GuardedRoute from "./utils/GuardedRoute";

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route
              path="cities"
              element={
                <GuardedRoute>
                  <CitiesPage />
                </GuardedRoute>
              }
            />
            <Route
              path="cities/:cityId"
              element={
                <GuardedRoute>
                  <CityDetailPage />
                </GuardedRoute>
              }
            />
            <Route
              path="users"
              element={
                <GuardedRoute>
                  <UsersPage />
                </GuardedRoute>
              }
            />
            <Route path="*" element={<div>404 - Page not found</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;

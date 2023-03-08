import { Routes, Route, BrowserRouter } from "react-router-dom";
import SharedLayout from "./pages/Dashboard/SharedLayout";
import Stats from "./pages/Dashboard/Stats";
import AddJob from "./pages/Dashboard/AddJob";
import AllJobs from "./pages/Dashboard/AllJobs";
import Profile from "./pages/Dashboard/Profile";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/userSlices";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./utils/ProtectedRoute";
import PageNotFound from "./pages/PageNotFound";
import Sites from "./pages/Dashboard/Sites";
import Landing from "./pages/Landing";
const store = configureStore({
  reducer: userSlice.reducer,
});
function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <SharedLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Stats />} />
              <Route path="addjob" element={<AddJob />} />
              <Route path="alljobs" element={<AllJobs />} />
              <Route path="profile" element={<Profile />} />
              <Route path="sites" element={<Sites />} />
            </Route>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;

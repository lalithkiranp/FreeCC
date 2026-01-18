import { Routes, Route, Navigate } from "react-router-dom";
import OwnerLayout from "./layouts/OwnerLayout";
import Dashboard from "./pages/Dashboard";
import OrdersPage from "./pages/OrdersPage";
import ManageMenu from "./pages/ManageMenu";
import RestaurantProfile from "./pages/RestaurantProfile";
import ReviewsPage from "./pages/ReviewsPage";

function App() {
  return (
    <Routes>
      <Route path="/owner" element={<OwnerLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="menu" element={<ManageMenu />} />
        <Route path="profile" element={<RestaurantProfile />} />
        <Route path="reviews" element={<ReviewsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/owner" />} />
    </Routes>
  );
}

export default App; 

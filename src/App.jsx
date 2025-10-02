import {useRoutes } from "react-router-dom";
import Navigation from "./component/navigation/Navigation.jsx";
import Home from "./pages/Home";
import DishDetailPage from "./pages/DishDetailPage";
import CartPage from "./pages/Cart.jsx";
import Employees from "./pages/Employees.jsx";
import Backoffice from "./pages/Backoffice.jsx";
import Login from "./component/login/Login.jsx";

function App() {
  const routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/dish/:id", element: <DishDetailPage /> },
    { path: "/cart", element: <CartPage /> },
    { path: "/employees", element: <Employees /> },
    { path: "/backoffice", element: <Backoffice /> },
    { path: "/login", element: <Login /> },

  ]);

 

  return (
    <div className="app">
      <Navigation />
      <div className="content">{routes}</div>
    </div>
  );
}

export default App;

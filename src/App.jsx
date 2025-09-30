import {useRoutes } from "react-router-dom";
import Navigation from "./component/navigation/Navigation.jsx";
import Home from "./pages/Home";
import DishDetailPage from "./pages/DishDetailPage";
import CartPage from "./pages/Cart.jsx";
import Employees from "./pages/Employees.jsx";

function App() {
  const routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/dish/:id", element: <DishDetailPage /> },
    { path: "/cart", element: <CartPage /> },
    { path: "/employees", element: <Employees /> },
  ]);

 

  return (
    <div className="app">
      <Navigation />
      <div className="content">{routes}</div>
    </div>
  );
}

export default App;

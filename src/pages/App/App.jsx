// Router setup
import { useRoutes, BrowserRouter } from "react-router-dom";
import { PostProvider } from "../../context";

// Components
import Navbar from "../../components/Navbar";

// Pages
import Home from "../Home";
import CreatePosts from "../CreatePosts";
import Favorites from "../Favorites";

// Styles
import "./App.css";

// Define routes
const routesConfig = [
  { path: "/", element: <Home /> },
  { path: "/create-posts", element: <CreatePosts /> },
  { path: "/favorites", element: <Favorites /> },
];

const AppRoutes = () => {
  const routes = useRoutes(routesConfig);
  return routes;
};

const App = () => {
  return (
    <PostProvider>
      <BrowserRouter>
        <AppRoutes />
        <Navbar />
      </BrowserRouter>
    </PostProvider>
  );
};

export default App;

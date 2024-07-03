import  { createBrowserRouter, RouterProvider  } from 'react-router-dom';
import AppLayout from './layout/AppLayout';
import Home from './pages/Home';
import Search from "./pages/Search";
import Category from "./pages/Category";
import SingleGif from "./pages/SingleGif";
import Favorites from "./pages/Favorites";
import GifProvider from './context/Context';

const router = createBrowserRouter([
  {
    element: <AppLayout />,

    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/:type/:slug",
        element: <SingleGif />,
      },
      {
        path: "/:category",
        element: <Category />,
      },
      {
        path: "/search/:query",
        element: <Search />,
      },
      {
        path: "/favorites",
        element: <Favorites />,
      },
    ],
  },
]);

const App = () => {
  return (
    <GifProvider>
      <RouterProvider router={router} />
    </GifProvider>
    
  );
};

export default App;
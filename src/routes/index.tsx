import Layout from "@/components/layout";
import { FilmDetail, Home, PopularFilms } from "@/pages";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "film/:id",
          element: <FilmDetail />,
        },
        {
            path: "popular-films",
            element: <PopularFilms />,
        }
      ],
    },
  ]);

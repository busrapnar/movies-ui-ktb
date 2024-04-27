import React from 'react';
import { useRoutes } from 'react-router-dom';
import Layout from '@/layout';
import { Home,  } from '@/pages';
import MovieDetail from '@/pages/movie-detail';


const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'movie/:id',
        element: <MovieDetail />,
      },
    ],
  },
];

export const RouterProvider: React.FC = () => {
  const element = useRoutes(routes);

  return <>{element}</>
}
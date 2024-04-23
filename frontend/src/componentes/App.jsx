import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Root from './Root';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    //TODO make error Component
    errorElement: <>404 Not found</>,
    //TODO add all the components to their respective routes
    children: [],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

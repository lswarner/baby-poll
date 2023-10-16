import { lazy, Suspense } from 'react';
import { Outlet, RouteObject, useRoutes, BrowserRouter } from 'react-router-dom';

const Loading = () => <p className="p-4 w-full h-full text-center">Loading...</p>;

const IndexScreen = lazy(() => import('~/screens/Index'));
const QuestionsScreen = lazy(() => import('~/screens/Questions'));
const Page404Screen = lazy(() => import('~/screens/404'));

function Layout() {
  return (
    <div className="min-h-screen">
      <div className="bg-primary">
        <div className="font-display text-4xl font-bold text-white absolute top-6 right-52">The Prenatal Pool</div>
        <img className="object-contain absolute top-0 right-32" src="public/floaty.png"  width="70px" height="70px" />
        <nav className="flex p-4 items-center">
          &nbsp;
        </nav>
      </div>
      <div className="bg-primary border-b-primary-focus border-b-2 rotate-1 h-6 w-full absolute top-11 -z-10">&nbsp;</div>
      <div className="mb-4">&nbsp;</div>
      <Outlet />
      <div className="sticky top-[100vh] relative mt-20">
        <div className="bg-primary rotate-1 h-6 w-full -z-10 absolute -top-3 border-t-2 border-t-primary-focus">&nbsp;</div>
        <div className="bg-primary h-20">
          <div className="container mx-auto px-20">
            <ul>
              <li>The Prenatal Pool</li>
              <li>PRGRN.dev</li>
            </ul>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export const Router = () => {
  return (
    <BrowserRouter>
      <InnerRouter />
    </BrowserRouter>
  );
};

const InnerRouter = () => {
  const routes: RouteObject[] = [
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <IndexScreen />,
        },
        {
          path: '*',
          element: <Page404Screen />,
        },
      ],
    },
    {
      path: '/questions',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <QuestionsScreen />,
        },
        {
          path: '*',
          element: <Page404Screen />,
        },
      ],
    },
  ];
  const element = useRoutes(routes);
  return (
    <div>
      <Suspense fallback={<Loading />}>{element}</Suspense>
    </div>
  );
};

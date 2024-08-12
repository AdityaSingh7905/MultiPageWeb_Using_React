import React from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

// import AllQuotes from "./pages/AllQuotes";
// import QuoteDetails from "./pages/QuoteDetails";
// import NewQuote from "./pages/NewQuote";
import Layout from "./components/layout/Layout";
// import NotFound from "./pages/NotFound";
import { Fragment } from "react";

const AllQuotes = React.lazy(() => import('./pages/AllQuotes'));
const QuoteDetails = React.lazy(() => import('./pages/QuoteDetails'));
const NewQuote = React.lazy(() => import('./pages/NewQuote'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="quotes" element={<AllQuotes />} />
        <Route path="quotes/:quoteId/*" element={<QuoteDetails />} />
        <Route path="new-quote" element={<NewQuote />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return (
    <Fragment>
      <RouterProvider router={router} />
    </Fragment>
  );
}

export default App;

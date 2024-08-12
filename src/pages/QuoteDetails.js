import { Routes, Route, Link } from "react-router-dom";
import { Fragment, useEffect } from "react";
import { useParams} from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import useHttp from "../components/hooks/use-http";
import { getSingleQuote } from "../components/lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const QuoteDetails = () => {
  const params = useParams();
  const {sendRequest, status, data : loadedQuote, error} = useHttp(getSingleQuote, true);

  const { quoteId} = params;

  useEffect(() => {
    sendRequest(quoteId)
  }, [sendRequest,quoteId]);

  if(status === 'pending'){
    return <div className="centered">
      <LoadingSpinner />
    </div>
  }

  if(error){
    return <div className="centered focused">{error}</div>
  }

  if(!loadedQuote.text){
    return <p>No Quote Found!!</p>
  }
 

  return (
    <Fragment>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
      <Routes>
        <Route path='/' element={<div className="centered">
        <Link className="btn--flat" to={`/quotes/${params.quoteId}/comments`}>
          Load Comments...
        </Link>
      </div>} />
        <Route path="comments" element={<Comments quoteId={params.quoteId}/>} />
      </Routes>
    </Fragment>
  );
};

export default QuoteDetails;

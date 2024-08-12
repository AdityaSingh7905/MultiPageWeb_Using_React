import { useNavigate } from "react-router-dom";
import QuoteForm from "../components/quotes/QuoteForm";
import { addQuote } from "../components/lib/api";
import useHttp from "../components/hooks/use-http";
import { useEffect } from "react";

const NewQuote = () => {
  const navigate = useNavigate();
  const { sendRequest, status } = useHttp(addQuote);

  useEffect(() => {
    if (status === "completed") {
      navigate("/quotes");
    }
  }, [status, navigate]);

  const addQuoteHandler = (quote) => {
    sendRequest(quote);
  };

  return <QuoteForm onAddQuote={addQuoteHandler} />;
};

export default NewQuote;

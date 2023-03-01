import React, { useEffect, useState } from "react";

export const useGetQuote = () => {
  const [quote, setQuote] = useState([]);

  const getQuote = async () => {
    fetch("https://type.fit/api/quotes")
      .then((res) => res.json())
      .then((quote) =>
        setQuote(quote[(Math.random() * quote.length).toFixed(0)])
      );
  };
  useEffect(() => {
    getQuote();
  }, []);

  return { quote };
};

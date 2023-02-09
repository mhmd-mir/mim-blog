import React, { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Test() {
  const articles = useSelector((state) => state.articles);
  useEffect(() => {
    console.log(articles);
  });
  return <div>Test</div>;
}

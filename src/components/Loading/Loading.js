import React from "react";
import { useSelector } from "react-redux";

import Loader from "../Loader/Loader";



export default function Loading() {
  const isLoading = useSelector((state) => state.loader);

  return <>{isLoading && <Loader />}</>;
}

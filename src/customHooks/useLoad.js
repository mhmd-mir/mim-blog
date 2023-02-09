import React, { useState } from "react";

export default function useLoad() {
  const [isLoading, setIsLoading] = useState(false);

  const startLoading = () => setIsLoading(true);
  const finishLoading = () => setIsLoading(false);

  return [isLoading, startLoading, finishLoading];
}

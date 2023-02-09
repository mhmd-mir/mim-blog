import React from "react";
import "./Loader.css";
export default function Loader() {
  return (
    <div className="loaderParent">
      <div class="spinner-border text-white loader" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

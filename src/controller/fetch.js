import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";

export const fetchData = async () => {
  try {
    const response = await fetch("http://localhost:3001/data").then((res) =>
      res.json()
    );
    return response;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

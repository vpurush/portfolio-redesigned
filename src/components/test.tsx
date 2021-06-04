import React, { useEffect, useState, useLayoutEffect } from "react";

export const Test = () => {
  const [message, setMessage] = useState("message");

  useLayoutEffect(() => {
    setMessage("use effect message");
  }, []);

  return <div>{message}</div>;
};

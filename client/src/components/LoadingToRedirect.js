// To prevent user enter the page by manually writing URL withought login
// => If user is not logged in, redirect to login page

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoadingToRedirect = () => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();
  useEffect(() => {
    // after 5 seconds, navigate to login page
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount); //the counter will start from 5 to 0
    }, 1000);
    count === 0 && navigate("/login");
    return () => clearInterval(interval);
  }, [count, navigate]);
  return (
    <div style={{marginTop:"100px"}}>
      <h5>Redirecting you in {count} seconds.</h5>
    </div>
  );
};

export default LoadingToRedirect;

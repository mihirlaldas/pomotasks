import React from "react";
import { Link } from "react-router-dom";
function Home() {
  return (
    <div>
      Home Page
      <Link to="/signup">Signup</Link>
      <Link to="/login">Login</Link>
      <Link to="/user">Profile</Link>
    </div>
  );
}

export default Home;

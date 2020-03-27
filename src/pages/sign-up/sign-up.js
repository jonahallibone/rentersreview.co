import React from "react";
import GoTrue from "gotrue-js";

const auth = new GoTrue({
  APIUrl: "https://rentersreview.co/.netlify/identity",
  audience: "",
  setCookie: false
});

const SignUp = () => {
  const handleSubmit = (event) => {
    const { target } = event;
    event.preventDefault();
    const email = target.elements["email"].value;
    const password  = target.elements["password"].value;

    try {
      auth.signup(email, password);
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }
  return (
    <form action="#" onSubmit={handleSubmit}>
      <input type="email" name="email" />
      <input type="password" name="password" />
      <button type="submit">Submit</button>
    </form>
  )
};

export default SignUp;

import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import AppContext from "../../AppContext";

const Callback = () => {
  const { handleAuthentication } = useContext(AppContext);
  const history = useHistory();
  
  useEffect(() => {
    const asyncAuth = async () => {
      await handleAuthentication();
      history.replace("/");
    };

    asyncAuth();
  }, [handleAuthentication, history]);

  const style = {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    height: "100vh",
    width: "100vw",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white"
  };

  return (
    <div style={style}>
      <h4>Loading</h4>
    </div>
  );
};

export default Callback;

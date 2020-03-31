import React, { useCallback } from "react";
import lottie from "lottie-web";
import * as data from "./loader.json";

const LottieLoader = () => {
  const lottieRef = useCallback(node => {
    if (node !== null) {
      lottie.loadAnimation({
        container: node,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: data.default
      });
    }
  }, []);

  return (
    <div
      ref={lottieRef}
      style={{
        display: "flex",
        alignItems: "center",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)"
      }}
    />
  );
};

export default LottieLoader;

import React from "react";
import ContentLoader from "react-content-loader";

const Loader = ({ className, ...rest }) => {
  const height = "72";
  const width = "100%";

  return (
    <li className={className}>
      <ContentLoader
        viewBox={`0 0 ${width} ${height}`}
        height={height}
        width={width}
        speed={2}
        {...rest}
      >
        <rect x="0" y="6" rx="5" ry="5" width="250" height="12" />
        <rect x="0" y="24" rx="5" ry="5" width="180" height="12" />
        <rect x="0" y="42" rx="5" ry="5" width="125" height="12" />
      </ContentLoader>
    </li>
  );
};

const ViolationsLoader = ({styles}) => (
  <>
    {Array(5)
      .fill("")
      .map((e, i) => (
        <Loader
          screen="desktop"
          key={i}
          className={styles.violation__item}
          style={{ opacity: Number(2 / i).toFixed(1) }}
        />
      ))}
  </>
);

export default ViolationsLoader;

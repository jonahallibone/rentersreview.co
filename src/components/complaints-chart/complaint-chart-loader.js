import React from "react";
import ContentLoader from "react-content-loader";

const ComplaintsChartLoader = props => (
  
    <ContentLoader style={{ marginBottom: "2rem"}} viewBox="0 0 600 250" speed={2} {...props}>
      <rect x="0" y="0" rx="5" ry="5" width="600" height="250" />
    </ContentLoader>
);

export default ComplaintsChartLoader;

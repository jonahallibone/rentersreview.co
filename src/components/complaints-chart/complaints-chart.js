import React, { useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { ResponsiveLine } from "@nivo/line";
import styles from "./complaints-chart.module.scss";
import ComplaintsChartLoader from "./complaint-chart-loader";
import ComplaintsSummary from "../complaints-summary/complaints-summary";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const GET_COMPLAINTS = gql`
  query getBuildingComplaints($buildingId: ID!) {
    getBuildingComplaints(buildingId: $buildingId) {
      complaintId
      unitType
      urgency
      majorCategory
      minorCategory
      code
      status
      statusDate
    }
  }
`;

const ComplaintsChart = ({ building }) => {
  const { buildingId } = building;
  const { loading, error, data } = useQuery(GET_COMPLAINTS, {
    variables: { buildingId }
  });

  if (loading) {
    return <ComplaintsChartLoader />;
  }

  const { getBuildingComplaints } = data;

  const yearArr = [];
  for (let z = 2015; z < new Date().getFullYear(); z++) {
    yearArr.push({ x: z, y: 0 });
  }

  const dataFormat = getBuildingComplaints.reduce(
    (prev, curr) => {
      const foundX = prev.findIndex(
        point => point.x === new Date(curr.statusDate).getFullYear()
      );
      if (foundX > -1) {
        const tmp = [...prev];
        tmp.splice(foundX, 1, { ...tmp[foundX], y: tmp[foundX].y + 1 });
        return tmp;
      }

      return [
        ...prev,
        {
          x: new Date(curr.statusDate).getFullYear(),
          y: prev.y + 1 || 1
        }
      ];
    },
    [...yearArr]
  );

  const maxY = dataFormat.reduce((prev, curr) => {
    if (curr.y > prev) {
      return curr.y;
    }

    return prev;
  }, 0);

  console.log(maxY);

  const chartData = [
    {
      id: "complaints",
      color: "red",
      data: dataFormat.sort((a, b) => a.x - b.x)
    }
  ];

  const Tooltip = ({ point }) => (
    <div className={styles.chart_tooltip}>{point.data.y} Complaints</div>
  );

  const Chart = () => (
    <ResponsiveLine
      data={chartData}
      margin={{ top: 25, right: 16, bottom: 25, left: 25 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "0",
        max: maxY + 5,
        stacked: false,
        reverse: false
      }}
      tooltip={tooltip => <Tooltip point={tooltip.point} />}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickValues: "every 1 month",
        legendOffset: -12
      }}
      enableCrosshair={false}
      axisLeft={{
        tickValues: 10,
        orient: "left",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legendOffset: -40,
        legendPosition: "middle"
      }}
      enableGridY={false}
      enableGridX
      enableArea
      pointSize={5}
      colors={["#1e90ff"]}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabel="y"
      pointLabelYOffset={-12}
      curve="monotoneX"
      useMesh
    />
  );

  return getBuildingComplaints.length ? (
    <Row>
      <Col xs={12}>
        <h6 className="mb-2">Complaints</h6>
        <div className={styles.complaints__chart}>
          <div className={styles.chart_data}>
            <Chart />
          </div>
          <ComplaintsSummary complaintData={getBuildingComplaints} />
        </div>
      </Col>
    </Row>
  ) : (
    <Row>
      <Col className={styles.chart_data}>
        <strong>No complaints found for this building</strong>
      </Col>
    </Row>
  );
};

export default ComplaintsChart;

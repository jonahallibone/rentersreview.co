import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./complaints-summary.module.scss";

const ComplaintsSummary = ({ complaintData }) => {
  const majorCategories = complaintData.reduce((prev, curr) => {
    const index = prev.findIndex(el => el.title === `${curr.majorCategory} — ${curr.minorCategory}`);

    if (index > -1) {
      const tmp = [...prev];
      tmp.splice(index, 1, {
        title: prev[index].title,
        count: prev[index].count + 1
      });
      return tmp;
    }

    prev.push({ title: `${curr.majorCategory} — ${curr.minorCategory}`, count: 1 });
    return prev;
  }, []);

  return (
    <Row>
      <Col xs={12}>
        <div className={styles.complaints_grid}>
          {majorCategories.map(category => (
            <div className={styles.complaint_metric} key={category.title}>
              <div className={styles.complaint_number}>{category.count}</div>
              <div className={styles.complaint_title}>{category.title}</div>
            </div>
          ))}
        </div>
      </Col>
    </Row>
  );
};

export default ComplaintsSummary;

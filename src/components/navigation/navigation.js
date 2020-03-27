import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link, useHistory } from "react-router-dom";
import { LogOut, ChevronDown, User } from "react-feather";
import Button from "../button/button";
import styles from "./navigation.module.scss";
import AppContext from "../../AppContext";
import Dropdown, { Option, OptionLink } from "../dropdown/dropdown";

const Navigation = () => {
  const { isLoggedIn, login, logout, user } = useContext(AppContext);
  const history = useHistory();

  return (
    <header className={styles.navigation}>
      <Container>
        <Row className="align-items-center justify-content-between">
          <Col xs>
            <Link to="/">
              <h6 className={styles.logo}>Renters Review</h6>
            </Link>
          </Col>
          <Col xs className="d-flex justify-content-end">
            <Button className="mr-2" type="link" to="/submit-review">
              Add a review
            </Button>
            {isLoggedIn ? (
              <Dropdown
                border={false}
                size="small"
                title={
                  <>
                    <ChevronDown strokeWidth={3} size={14} className="mr-2" />
                    {user?.email}
                  </>
                }
              >
                <Option onClick={() => history.push("/profile") }>
                    <User strokeWidth={3} size={14} className="mr-3" />
                    <span>Profile</span>
                </Option>
                <Option onClick={logout}>
                  <LogOut strokeWidth={3} size={14} className="mr-3" />
                  <span>Logout</span>
                </Option>
              </Dropdown>
            ) : (
              <Button className="btn btn-info" onClick={() => login()}>
                Log In
              </Button>
            )}
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default Navigation;

import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Style/Dnav.css";
import { Button, Card, Col, Nav, Navbar, Row, Table } from "react-bootstrap";
import briefcase from "../Images/Briefcase.png";
import dash from "../Images/Circled Menu.png";
import support from "../Images/Support.png";
import plugin from "../Images/Puzzle.png";
import help from "../Images/Help.png";
import logout from "../Images/Shutdown.png";
import sun from "../Images/sunny.png";
import media from "../Images/Assets/media.png";
import fb from "../Images/Assets/facebook.png";
import ig from "../Images/Assets/instagram.png";
import tw from "../Images/Assets/twitter.png";
import img from "../Images/Assets/Rectangle 10.png";
import Chart from "chart.js/auto";
import { getRelativePosition } from "chart.js/helpers";
import { Chart as ChartJS, Pie } from "react-chartjs-2";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { AxiosContext } from "react-axios/lib/components/AxiosProvider";
import { Pagination } from "react-bootstrap";

function DNav() {
  let active = 1;
  let items = [];
  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>
    );
  }
  const [ldata, setLdata] = useState([]);
  const [piedata, setPiedata] = useState([]);
  const [tabledata, setTabledata] = useState([]);

  useEffect(() => {
    //linedata
    axios.get("http://localhost:3001/api/graph").then((linedata) => {
      setLdata(linedata.data);
      // console.log(linedata.data);
    });

    axios.get("http://localhost:3001/api/pie-chart").then((piedata) => {
      setPiedata(piedata.data);
    });

    axios.get("http://localhost:3001/api/table").then((tdata) => {
      setTabledata(tdata.data);
      console.log(tdata.data);
    });
  }, []);

  return (
    <div>
      <Row>
        <Col xs={2} md={2} className="side">
          <nav
            className="col-md-2  d-none d-md-block bg-dark sidebar "
            id="nav"
          >
            <div className="sidebar-sticky">
              <img src={briefcase} className="briefcase"></img>
              <ul className="nav flex-column" id="ulist">
                <li className="nav-item">
                  <Button variant="light" className="dashbtn">
                    {" "}
                    <img className="btnimg" src={dash}></img> Dashboard
                  </Button>
                </li>
                <li className="nav-item">
                  <Button variant="dark" className="dashbtn">
                    <img className="btnimg" src={support}></img> Support
                  </Button>
                </li>
                <li className="nav-item">
                  <Button variant="dark" className="dashbtn">
                    <img className="btnimg" src={plugin}></img> Plugins
                  </Button>
                </li>
                <li className="nav-item">
                  <Button variant="dark" className="dashbtn">
                    <img className="btnimg" src={help}></img>Help
                  </Button>
                </li>
              </ul>
            </div>
            <button className="logbtn">
              {" "}
              Logout <img src={logout}></img>
            </button>
          </nav>
        </Col>
        <Col className="sm=8" id="charts">
          <div className="line1">
            <h5 className="gm">
              Good Morning ! <img src={sun} width={"20px"}></img>{" "}
            </h5>
            <div
              style={{
                display: "flex",
                backgroundColor: "white",
                width: "120px",
                textAlign: "center",
                borderRadius: "10px",
                marginLeft: "860px",
                padding: "5px",
              }}
            >
              <p style={{ fontSize: "10px" }}>
                <b>John Doe</b>
                <br />
                john@doe.com
              </p>
              <img
                src={img}
                height={"30px"}
                style={{ marginLeft: "10px" }}
              ></img>
            </div>
          </div>
          <div className="line2">
            <div className="datacard revenueCard" id="linechart">
              <Line
                data={{
                  labels: ldata.map((data) => data.x),
                  datasets: [
                    {
                      label: "",
                      data: ldata.map((data) => data.y),
                    },
                  ],
                }}
              />
            </div>
            <div className="piechart">
              <Pie
                data={{
                  labels: piedata.map((pdata) => pdata.label),
                  datasets: [
                    {
                      label: "",
                      data: piedata.map((pdata) => pdata.value),
                      backgroundColor: [
                        "rgba(151,252,119,0.8)",
                        "#41F786",
                        "#129543",
                        "#378655",
                        "#114726",
                      ],
                      borderRadius: 5,
                    },
                  ],
                }}
              />
            </div>
          </div>
          <div className="line3">
            <div className="table1">
              <Table
                striped
                bordered
                hover
                className="tablecontent"
                style={{ width: "870px" }}
              >
                <thead>
                  <tr>
                    <th>id</th>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {tabledata?.map((i) => {
                    return (
                      <tr>
                        <td>{i.id}</td>
                        <td>{i.name}</td>
                        <td>{i.quantity}</td>
                        <td>{i.price}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              <div className="page">
                <Pagination>{items}</Pagination>
                <br />
              </div>
            </div>

            <Card
              style={{
                width: "250px",
                height: "300px",
                marginTop: "30px",
                textAlign: "center",
              }}
            >
              <Card.Img
                variant="top"
                src={media}
                style={{ width: "250px", height: "180px" }}
              />
              <Card.Body>
                <Card.Title>John Doe</Card.Title>
                <Card.Text>CEO</Card.Text>
                <div>
                  <img src={fb} className="sbtn"></img>
                  <img src={ig} className="sbtn"></img>
                  <img src={tw} className="sbtn"></img>
                </div>
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default DNav;

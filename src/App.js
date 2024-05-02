import React, { useState } from 'react';
import axios from 'axios';
import { Form, Container, Row, Col, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWind, faTemperatureFull, faTemperatureArrowDown, faTemperatureArrowUp, faEye, faWater } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=952dabd57f952e5bd2486c49693bf61c`;

  const searchLocation = async (event) => {
    if (event.key === 'Enter') {
      try {
        const response = await axios.get(url);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setLocation('');
    }
  };

  return (
    <section className="weather-app">
      <Container className='mt-4'>
        <Row className="justify-content-center">
          <Col xs={12} className="text-center">
            <Form.Control
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              onKeyPress={searchLocation}
              placeholder='Enter Location'
              type="text" />
          </Col>
        </Row>
        {data.name && (
          <>
            <Row className="mt-3 justify-content-center">
              <Col xs={12} sm={8} md={6} lg={4}>
                <Card>
                  <Card.Body>
                    <Card.Title>{data.name}</Card.Title>
                    {data.main && (
                      <>
                        <Card.Text>{data.main.temp.toFixed()}°F</Card.Text>
                        <Card.Text>{data.weather[0].main}</Card.Text>
                      </>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row className="mt-3 justify-content-center">
              <Col xs={12} sm={8} md={6} lg={4}>
                <Row>
                  <Col>
                    <Card>
                      <Card.Body>
                        <h3>Feels Like <FontAwesomeIcon icon={faTemperatureFull} color="#000" /></h3>
                        {data.main && <p>{data.main.feels_like.toFixed()}°F</p>}
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card>
                      <Card.Body>
                        <h3>Humidity <FontAwesomeIcon icon={faWater} color="#000" /></h3>
                        {data.main && <p>{data.main.humidity.toFixed()}%</p>}
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col>
                    <Card>
                      <Card.Body>
                        <h3>Wind Speed <FontAwesomeIcon icon={faWind} color="#000" /></h3>
                        {data.wind && <p>{data.wind.speed.toFixed()} MPH</p>}
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card>
                      <Card.Body>
                        <h3>Temp-Min <FontAwesomeIcon icon={faTemperatureArrowDown} color="#000" /></h3>
                        {data.main && <p>{data.main.temp_min.toFixed()}°F</p>}
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col>
                    <Card>
                      <Card.Body>
                        <h3>Temp-Max <FontAwesomeIcon icon={faTemperatureArrowUp} color="#000" /></h3>
                        {data.main && <p>{data.main.temp_max.toFixed()}°F</p>}
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card>
                      <Card.Body>
                        <h3>Visibility <FontAwesomeIcon icon={faEye} color="#000" /></h3>
                        {data.visibility && <p>{(data.visibility / 1000).toFixed(1)} km</p>}
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </section>
  );
}

export default App;

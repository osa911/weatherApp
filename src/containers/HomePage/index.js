import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import {
  Grid,
  Row,
  Col,
  Label,
  FormGroup,
  InputGroup,
  Button,
  Badge,
  Panel,
  Alert,
} from 'react-bootstrap';

import selectors from './selectors';
import * as actions from './actions';

const imageFunc = country => (
  <img title={country} src={`http://openweathermap.org/images/flags/${country.toLowerCase()}.png`} />
);

class HomePage extends Component {
  static propTypes = {
    saveUserGeo: PropTypes.func.isRequired,
    isLoad: PropTypes.bool,
    isLoadCity: PropTypes.bool
  }

  constructor(props) {
    super(props);
    if(navigator.geolocation) {
      // if nafigator = true -> get user position;
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude.toFixed(2);
        const lon = position.coords.longitude.toFixed(2);
        // save user geo to store
        this.props.saveUserGeo({
          lat: lat,
          lon: lon,
        });
      });
    }
  }

  componentWillReceiveProps(nextProps){
    const { lang, userGeo, loadWeatherByGeo, savedCity, loadSavedCity } = this.props;
    const { lang: nextLang, userGeo: nextUserGeo, savedCity: nextSavedCity } = nextProps;
    if (lang !== nextLang || userGeo !== nextUserGeo) {
      loadWeatherByGeo({...nextUserGeo, lang: nextLang })
      if (nextSavedCity.length) {
        loadSavedCity(nextSavedCity.join(), nextLang)
      }
    }
    if (savedCity.length !== nextSavedCity.length) {

      loadSavedCity(nextSavedCity.join(), nextLang)
    }
  }

  findCity = () => {
    const { findCity, searchType, lang } = this.props;
    findCity(this.refs.searchCityName.value, searchType, lang);
  }

  setSearchType = e => {
    const { setSearchType } = this.props;
    const searchType = e.target.checked ? 'accurate' : 'like';
    setSearchType(searchType);
  }

  addToSaved = cityId => () => {
    const { savedCity, addToSavedCity } = this.props;
    if (savedCity.indexOf(cityId) === -1) {
      addToSavedCity(cityId);
    }
  }

  delSavedCity = id => () => {
    const { delCity } = this.props;
    delCity(id);
  }

  render() {
    const {
      currentWeather,
      isLoad,
      isLoadCity,
      searchType,
      findCityList,
      savedCityEntity,
    } = this.props;

    console.log('this.props', this.props);
    return (
      <Grid>
        {isLoad ?
          <Row className="show-grid">
            <Col md={12}>Подождите... Определяем Ваше местоположение</Col>
          </Row>
        : <Row className="show-grid">
            <Col md={8} sm={8}>
              <Row className="show-grid">
                <Col md={12}>
                  <Panel header={imageFunc(currentWeather.sys.country)} bsStyle="info">
                    <h4>
                      В {currentWeather.name} сейчас: &nbsp;
                      <Label bsStyle="primary">
                        {currentWeather.weather[0].description}.
                      </Label>
                    </h4>
                    <h4>
                      Температура воздуха: &nbsp;
                      <Label bsStyle="primary">
                        {currentWeather.main.temp} °C.
                      </Label>
                    </h4>
                    <h4>
                      Скорость ветра: &nbsp;
                      <Label bsStyle="primary">
                        {currentWeather.wind.speed}  м/с.
                      </Label>
                    </h4>
                  </Panel>
                </Col>
              </Row>
              {
                savedCityEntity && savedCityEntity.map((i, k) => (
                  <Row className="show-grid" key={k}>
                    <Col md={12}>
                      <Alert
                        bsStyle="info"
                        onDismiss={this.delSavedCity(i.id)}
                      >
                        <h4>{imageFunc(i.sys.country)}</h4>
                        <h4>
                          В {i.name} сейчас: &nbsp;
                          <Label bsStyle="primary">
                            {i.weather[0].description}.
                          </Label>
                        </h4>
                        <h4>
                          Температура воздуха: &nbsp;
                          <Label bsStyle="primary">
                            {i.main.temp} °C.
                          </Label>
                        </h4>
                        <h4>
                          Скорость ветра: &nbsp;
                          <Label bsStyle="primary">
                            {i.wind.speed}  м/с.
                          </Label>
                        </h4>
                      </Alert>
                    </Col>
                  </Row>
                ))
              }
            </Col>
            <Col md={4} sm={4}>
              <Row className="show-grid">
                <Col md={12}>
                  <FormGroup>
                    <InputGroup>
                    <InputGroup.Addon>
                      <input
                        type="checkbox"
                        title={searchType !== 'like' ? 'Поиск с начала строки.' : 'Поиск по всему полю.'}
                        checked={searchType === 'like' ? false : true}
                        onChange={this.setSearchType}
                        />
                    </InputGroup.Addon>
                      <input
                        type="text"
                        ref="searchCityName"
                        placeholder="Введите город для поиска"
                        className="form-control"
                        onKeyPress={(e) => e.charCode === 13 && this.findCity()}
                        />
                      <InputGroup.Button>
                        <Button onClick={this.findCity}>Поиск</Button>
                      </InputGroup.Button>
                    </InputGroup>
                  </FormGroup>
                </Col>
              </Row>
              <Row className="show-grid">
                <Col md={12}>
                  {
                    isLoadCity ? 'Подождите, идет загрузка...'
                    : findCityList &&
                      findCityList.map((i,k) => (
                        <Row className="show-grid" key={k} style={{ marginTop: '5px' }}>
                          <Col md={12}>
                            <Badge>{k+1}</Badge> {imageFunc(i.sys.country)} {i.name}
                            <Button
                              bsStyle="success"
                              bsSize="xsmall"
                              style={{ float: 'right'}}
                              onClick={this.addToSaved(i.id)}
                            >Save</Button>
                          </Col>
                        </Row>
                      ))
                  }
                </Col>
              </Row>





            </Col>
          </Row>
        }
      </Grid>
    );
  }
}

export default connect(selectors, actions)(HomePage);

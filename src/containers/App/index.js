import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Header from '../../components/Header';
import Select from '../../components/Select';
import selectors from './selectors';
import * as actions from './actions';

class App extends Component {
  changeLang = (e) => {
    this.props.setLang(e.target.value)
  }
  render() {
    const { lang, langArr } = this.props;
    return (
      <div className="wrapper">
        <Header>
          <Select
            md={2}
            styles={{ float: 'right', top: '7px', right: '-15px'}}
            placeholder={'Выбор языка'}
            options={langArr}
            onChange={this.changeLang}
            value={lang}
          />
        </Header>
        <Row className="show-grid">
          <Col xs={12} md={12}>
            {this.props.children}
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect(selectors, actions)(App);

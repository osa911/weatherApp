import React, { PropTypes, Component } from 'react';
import { FormGroup, FormControl, Col } from 'react-bootstrap';

class Select extends Component {
  static propTypes = {
    md:          PropTypes.number,
    styles:      PropTypes.object,
    placeholder: PropTypes.string.isRequired,
    options:     PropTypes.array.isRequired,
    onChange:    PropTypes.func.isRequired,
    value:       PropTypes.string,
  }

  static defaultProps = {
    md:          6,
    styles:      {},
    placeholder: '',
    options:     [],
    value:       '-1'
  }

  render() {
    const { md, styles, placeholder, options, onChange, value } = this.props;
    return (
        <Col md={md} style={styles}>
          <FormGroup controlId="formControlsSelect">
              <FormControl
                componentClass="select"
                placeholder={placeholder}
                onChange={onChange}
                value={value}
              >
                <option value="-1" disabled>{placeholder}</option>
              {
                options && options.map((i, key) => (
                  <option key={key} value={i.value}>{ i.label }</option>
                ))
              }
              </FormControl>
          </FormGroup>
        </Col>
    );
  }
}

export default Select;

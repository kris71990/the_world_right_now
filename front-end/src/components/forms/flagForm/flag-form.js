import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import autoBind from '../../../utils/autoBind';

import CustomButton from '../../common/button/button';

import { parseCountryName } from '../../../utils/parser';
import * as countryActions from '../../../actions/countryActions';
import * as photoActions from '../../../actions/photoActions';
import './flag-form.scss';

const defaultState = {
  flagUrl: '',
  flagUrlDirty: false,
  flagUrlError: 'Flag link invalid',
};

class FlagForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
    autoBind.call(this, FlagForm);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
      flagUrlDirty: false,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { country } = this.props;
    const searchableCountryName = parseCountryName(country.countryName);
    
    if (this.state.flagUrl.slice(0, 29) !== 'https://upload.wikimedia.org/'
        || !this.state.flagUrl.includes('Flag') 
        || !this.state.flagUrl.includes(searchableCountryName)) {
      this.setState({ flagUrlDirty: true });
    } else {
      this.props.flagCreate(this.state, country._id)
        .then(() => {
          this.props.countryGet(this.props.country);
        });
      this.setState(defaultState);
    }
  }

  render() {
    return (
      <div className="flag-container">
        <h4>{ 'Enter Url of flag picture:' }</h4>
        <form className="flag-form" onSubmit={ this.handleSubmit }>
          <input
            className="flag-url"
            name="flagUrl"
            placeholder="Enter URL"
            type="text"
            value={ this.state.countryName }
            onChange={ this.handleChange }
          />
          <CustomButton text='Submit'/>
          { this.state.flagUrlDirty ? 
              <p>{ this.state.flagUrlError }</p>
            : null
          }
        </form>
      </div>
    );
  }
}

FlagForm.propTypes = {
  flagCreate: PropTypes.func,
  countryGet: PropTypes.func,
  country: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    country: state.country,
  };
};

const mapDispatchToProps = dispatch => ({
  flagCreate: (flag, countryId) => dispatch(photoActions.flagCreateRequest(flag, countryId)),
  countryGet: country => dispatch(countryActions.countryGetRequest(country._id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FlagForm);
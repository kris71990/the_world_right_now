import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import autoBind from '../../utils/autoBind';

import * as routes from '../../utils/routes';
import * as flagActions from '../../actions/flagActions';
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

    let searchableCountryName;

    if (country.countryName.includes('_')) {
      searchableCountryName = country.countryName.split('_').map(x => x.charAt(0).toUpperCase() + x.slice(1)).join(' ');
    } else {
      searchableCountryName = 
      country.countryName.charAt(0).toUpperCase() + country.countryName.slice(1);
    }

    if (!this.state.flagUrl.includes('wikipedia') 
        || !this.state.flagUrl.includes('Flag') 
        || !this.state.flagUrl.includes(searchableCountryName)) {
      this.setState({ flagUrlDirty: true });
    } else {
      this.props.flagCreate(this.state, country._id);
      this.setState(defaultState);
      window.location.reload();
    }
  }

  render() {
    return (
      <div className="flag-container">
        <h4>{'Enter Url of flag picture:'}</h4>
        <form className="flag-form" onSubmit={this.handleSubmit}>
          <input
            className="flag-url"
            name="flagUrl"
            placeholder="Enter URL"
            type="text"
            value={this.state.countryName}
            onChange={this.handleChange}
          />
          <button type="submit">Submit</button>
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
  country: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    country: state.country,
  };
};

const mapDispatchToProps = dispatch => ({
  flagCreate: (flag, countryId) => dispatch(flagActions.flagCreateRequest(flag, countryId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FlagForm);
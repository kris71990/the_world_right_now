import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import autoBind from '../../utils/autoBind';

import CountryForm from '../forms/countryForm/countryForm';
import SelectMenu from '../select-country/select-country';
import * as countryActions from '../../actions/countryActions';
import * as routes from '../../utils/routes';
import './landing.scss';

const defaultState = {
  selected: '',
  redirect: false,
};

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
    autoBind.call(this, Landing);
  }

  componentDidMount() {
    return this.props.countryListFetch()
      .then(() => {
        return this.props.countriesExistingFetch();
      });
  }

  handleCreateCountry(country) {
    this.props.countryCreate(country)
      .then(() => {
        this.props.history.push(routes.ROOT_ROUTE);
      });
  }

  handleChange(e) {
    this.setState({
      selected: e.target.value,
    });
  }

  handleSearch() {
    this.setState({ selected: this.state.selected, redirect: true });
  }

  handleCountBlurb(countryCount) {
    if (countryCount === 1) {
      return `Tracking ${countryCount} country`;
    }
    return `Tracking ${countryCount} countries and territories`;
  }

  render() {
    const { redirect } = this.state;
    const { countryList, countriesExisting } = this.props;

    return (
      <div className="landing">
        <p>{ this.handleCountBlurb(countriesExisting.length) }</p>
        <SelectMenu 
          onClick={ this.handleSearch } 
          onChange={ this.handleChange }
          value={ this.state.selected }
          countries={ countriesExisting }
        />
        <p>---------------------</p>
        <CountryForm 
          onComplete={ this.handleCreateCountry } 
          countries={ countryList }
        />
        { redirect 
          ? <Redirect to={{ pathname: '/countries', state: { selected: this.state.selected } }}/> 
          : null 
        }
      </div>
    );
  }
}

Landing.propTypes = {
  countryList: PropTypes.array,
  countriesExisting: PropTypes.array,
  countryListFetch: PropTypes.func,
  countriesExistingFetch: PropTypes.func,
  countryCreate: PropTypes.func,
  history: PropTypes.object,
  selected: PropTypes.string,
  redirect: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    countryList: state.countries.countries,
    countriesExisting: state.countries.existing,
  };
};

const mapDispatchToProps = dispatch => ({
  countryListFetch: () => dispatch(countryActions.countryListGetRequest()),
  countryCreate: country => dispatch(countryActions.countryCreateRequest(country)),
  countriesExistingFetch: () => dispatch(countryActions.countriesExistingFetch()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);

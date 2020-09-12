import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import autoBind from '../../utils/autoBind';

// import CapitalMap from '../capital-map/capital-map';
import SystemElections from '../system-elections/system-elections';
import SystemLeaders from '../system-leaders/system-leaders';

import * as systemActions from '../../actions/systemActions';
import * as parser from '../../utils/parser';
import './system.scss';

class System extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.location.state;
    autoBind.call(this, System);
  }

  componentDidMount() {
    this.props.systemGet(this.state.selected.countryName)
      .then((response) => {
        this.setState({ selected: response.body });
      });
  }

  handleUpdateSystem() {
    this.props.systemUpdate(this.props.selected)
      .then(() => {
        this.props.systemGet(this.props.selected.countryName);
      });
  }

  render() {
    const { selected } = this.props;
    let nameJSX = null;
    let capitalJSX = null;

    if (selected) {
      if (selected.fullName === 'none') {
        nameJSX = <h1>{ parser.parseCountryName(selected.countryName) }</h1>;
      } else if (selected.fullName) {
        nameJSX = <h1>{ parser.parseFullCountryName(selected.fullName) }</h1>;
      }

      if (selected.capital) {
        capitalJSX = 
          <div>
            <h4>Capital: </h4>
            <ul className="capitals">
              {
                selected.capital.map((x) => {
                  return (
                    <li key={x}>{ x }</li>
                  );
                })
              }
            </ul>
          </div>;
      }
    }

    return (
      <div className="system-info">
        { nameJSX }
        <p>Last Updated: { selected ? selected.lastUpdated : null }</p>
        <button onClick={ this.handleUpdateSystem }>Update</button> 
        <h4>Type of Government: <span>{ selected ? selected.typeOfGovernment : null }</span></h4>
        { capitalJSX }
        {
          // selected ? <CapitalMap selected={selected}/> : null
        }
        {
          selected ? 
            selected.independence ? <h4>Independence: <span>{ selected.independence } </span></h4>
              : null : null
        }
        <p>---------------------------------------</p>
        <SystemLeaders selected={selected}/>
        <p>---------------------------------------</p>
        <SystemElections selected={selected}/>
      </div>
    );
  }
}

System.propTypes = {
  history: PropTypes.object,
  selected: PropTypes.object,
  location: PropTypes.object,
  systemGet: PropTypes.func,
  systemUpdate: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    selected: state.system,
  };
};

const mapDispatchToProps = dispatch => ({
  systemGet: system => dispatch(systemActions.systemGetRequest(system)),
  systemUpdate: country => dispatch(systemActions.systemUpdateRequest(country)),
});

export default connect(mapStateToProps, mapDispatchToProps)(System);

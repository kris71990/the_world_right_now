import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import * as rankingActions from '../../actions/rankingActions';
import * as routes from '../../utils/routes';
import * as parser from '../../utils/parser';

import './population-rank.scss';


class PopulationRank extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.state || {};
  }

  componentDidMount() {
    this.props.populationGet()
      .then((response) => {
        this.setState({ popRank: response.body });
      });
  }

  render() {
    const { popRank } = this.state;
    let popJSX = null;

    if (popRank) {
      popJSX = 
        <ul className="pop-list">
          {
            popRank.map((x) => {
              const population = Number(x.population).toLocaleString();

              return (
                <li key={ x.id }>
                  <p className="country-ranking">{x.populationRank}</p>
                  {
                    <p className="country-name">
                    {
                      <Link to={{ pathname: routes.COUNTRY_ROUTE, state: { selected: x.id } }}>
                        { parser.parseCountryName(x.countryName) }
                      </Link>
                      }
                    </p>
                  }
                  <p className="country-ranking-data">{population}</p>
                </li>
              );
            })
          }
        </ul>;
    }

    return (
      <div className="rankings"> 
        <h1>Population</h1>
        <p>Most populated (in millions)</p>
        {
          popRank ? popJSX : null
        }
      </div>
    );
  }
}

PopulationRank.propTypes = {
  history: PropTypes.object,
  popRank: PropTypes.array,
  populationGet: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    popRank: state.rankings,
  };
};

const mapDispatchToProps = dispatch => ({
  populationGet: () => dispatch(rankingActions.populationFetchRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PopulationRank);

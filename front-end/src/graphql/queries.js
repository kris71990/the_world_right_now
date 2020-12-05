import { gql } from '@apollo/client';

const GET_COUNTRIES = gql`
  query {
    countries {
      _id
      countryName
    }
  }
`;

const GET_COUNTRY = gql`
  query country($id: String!) {
    country(id: $id) {
      _id
      countryName
      lastUpdated
      hasLinkedSystem
      location
      area
      areaRank
      population
      populationRank
      lifeExpectancy
      lifeExpectancyRank
      gdpPPPRank
      typeOfGovernment
      borderCountries
      naturalResources
      ethnicities {
        name
        percent
      }
      languages {
        name
        note
      }
      religions {
        name
        percent
        breakdown {
          name
          percent
        }
      }
      exports
      imports
      exportPartners {
        name
        percent
      }
      importPartners {
        name
        percent
      }
    }
  }
`;

const GET_GDP_RANK = gql`
  query {
    rankingsGDP {
      _id
      countryName
      gdpPPPRank
    }
  }
`;

export { GET_COUNTRIES, GET_COUNTRY, GET_GDP_RANK };
'use strict';

import logger from './logger';

const parseElectionDates = (exec, leg) => {
  logger.log(logger.INFO, 'Parsing election dates');

  const elections = { exec: {}, leg: {} };
  const findNextRx = /(((next)+)(.*?)[)])/g;
  const findLastRx = /(last.*?)(([(])(.*?))/g;
  const findDateRx = /(((([0-9]{2})(.*?)\s)|(\w+)\s)([\d]{4}))/g;

  const execNext = exec.match(findNextRx);
  const execLast = exec.match(findLastRx);
  const legNext = leg.match(findNextRx);
  const legLast = leg.match(findLastRx);

  if (!execNext) {
    elections.exec.next = null;
  } else if (execNext.length === 1) {
    elections.exec.next = execNext[0].match(findDateRx);
  } else {
    elections.exec.next = [];
    execNext.map((x, i) => elections.exec.next.push(x[i].match(findDateRx)));
  }

  if (!execLast) {
    elections.exec.last = null;
  } else if (execLast.length === 1) {
    elections.exec.last = execLast[0].match(findDateRx);
  } else {
    elections.exec.last = [];
    execLast.map(x => elections.exec.last.push(x.match(findDateRx)));
  }

  if (!legNext) {
    elections.leg.next = null;
  } else if (legNext.length === 1) {
    elections.leg.next = legNext[0].match(findDateRx);
  } else {
    elections.leg.next = [];
    legNext.map(x => elections.leg.next.push(x.match(findDateRx)));
  }

  if (!legLast) {
    elections.leg.last = null;
  } else if (legLast.length === 1) {
    elections.leg.last = legLast[0].match(findDateRx);
  } else {
    elections.leg.last = [];
    legLast.map(x => elections.leg.last.push(x.match(findDateRx)));
  }

  return elections;
};

export default parseElectionDates;

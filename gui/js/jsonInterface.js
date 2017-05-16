/*
  Client-side utilities for parsing expressive.json into manageable chucks to hand
  to react components
*/

const diff = require('deep-diff').diff;
const xpr = require('./../../expressive.json');

const JSONInterface = {
  getStateChanges: (xpr) => {
    const routeList = Object.keys(xpr).filter(key => key !== 'completedReqs');
    const snapArrays = routeList.map((route) => {
      let snapArray = [];
      if (route !== 'completedReqs') {
        let curr = xpr[route];
        while (curr) {
          snapArray.push(curr.snapshot);
          curr = curr.next;
        }
      }
      return snapArray;
    });
    const stateChanges = routeList.reduce((changesObj, route, i) => {
      changesObj[route] = snapArrays[i].reduce((changeList, snap, j) => {
        if (j < snapArrays[i].length - 1) changeList.push(diff(snapArrays[i][j], snapArrays[i][j + 1]));
        return changeList;
      }, []);
      return changesObj;
    }, {});

    return stateChanges;
  },

  getReqSnapshots: (xpr) => {
    const routeList = Object.keys(xpr).filter(key => key !== 'completedReqs');
    const reqSnaps = routeList.map(route => {
      let snaps = [];
      let curr = xpr[route];
      while (curr) {
        snaps.push(curr.snapshot.req);
        curr = curr.next;
      }
      return snaps;
    });

    const obj = routeList.reduce((accObj, route, i) => {
      accObj[route] = reqSnaps[i];
      return accObj;
    }, {});

    return obj;
  },

  getResSnapshots: (xpr) => {
    const routeList = Object.keys(xpr).filter(key => key !== 'completedReqs');
    const resSnaps = routeList.map(route => {
      let snaps = [];
      let curr = xpr[route];
      while (curr) {
        snaps.push(curr.snapshot.res);
        curr = curr.next;
      }
      return snaps;
    });

    const obj = routeList.reduce((accObj, route, i) => {
      accObj[route] = resSnaps[i];
      return accObj;
    }, {});

    return obj;
  },

  getSummaries: (xpr) => {
    const routeList = Object.keys(xpr).filter(key => key !== 'completedReqs');
    const summariesArr = routeList.map(route => {
      const summaryArr = [];
      let curr = xpr[route];
      while (curr) {
        let obj = Object.assign({}, curr);
        delete obj.next;
        delete obj.snapshot;
        summaryArr.push(obj);
        curr = curr.next;
      }
      return summaryArr;
    });

    const obj = routeList.reduce((accObj, route, i) => {
      accObj[route] = summariesArr[i];
      return accObj;
    }, {});

    return obj;
  },

  getReports: (xpr) => {
    const Summaries = JSONInterface.getSummaries(xpr);
    const ReqSnaps = JSONInterface.getReqSnapshots(xpr);
    const ResSnaps = JSONInterface.getResSnapshots(xpr);
    const Changes = JSONInterface.getStateChanges(xpr);

    const routeList = Object.keys(xpr).filter(key => key !== 'completedReqs');
    return routeList.reduce((reportsObj, route, i) => {
      reportsObj[route] = {
        summaries: Summaries[route],
        reqSnaps: ReqSnaps[route],
        resSnaps: ResSnaps[route],
        changes: Changes[route]
      }
      return reportsObj;
    }, {});
  },

  getReportLines: (xpr, routeId) => {
    const reports = JSONInterface.getReports(xpr);

    const reportLines = [];
    reports[routeId].resSnaps.forEach((resSnap, i) => {
      const change = reports[routeId].changes[i - 1] ? reports[routeId].changes[i - 1] : null;
      reportLines.push({
        isOpen: true,
        detailsDisplay: '',
        res: resSnap,
        req: reports[routeId].reqSnaps[i],
        change,
        overview: reports[routeId].summaries[i]
      });
    });

    return reportLines;
  },

  getChangeHighlights: (changes) => {
    const watchPaths = [
      'res._headers', 'res.locals', 'res._headerSent', 'res.finished',
      'req.complete', 'req.body', 'req.cookies', 'req.signedCookies'
    ];

    function isWatched(diffObj, i, changes) {
      const paths = changes.map(diffObj => diffObj.path.join('.'));
      let watched = false;
      let j = 0;
      while (!watched && j < watchPaths.length) {
        if (paths[i].indexOf(watchPaths[j]) === 0) watched = true;
        j += 1;
      }
      return watched;
    }

    let watchedChanges;
    if (changes) {
      watchedChanges = changes.filter(isWatched);
    }
    return watchedChanges;
  },

  getResponseHighlights: (res) => {
    const watchPaths = [
      '_headers', 'locals', '_headerSent', 'finished', '_contentLength', '_last',
      '_events', '_removedHeader', '_hasBody', '_trailer'
    ];

    const highlights = Object.keys(res).filter(key => watchPaths.includes(key)).reduce((obj, key) => {
      obj[key] = res[key];
      return obj
    }, {});
    return highlights;
  }, 

  getRequestHighlights: (req) => {
    console.log("this is the req", req)
    const watchPaths = [
      'route', 'rawHeaders', 'readableState'
    ];
    const highlights = Object.keys(req).filter(key => watchPaths.includes(key)).reduce((obj, key) => {
      obj[key] = req[key];
      return obj
    }, {});
    return highlights;
  }

};


module.exports = JSONInterface;

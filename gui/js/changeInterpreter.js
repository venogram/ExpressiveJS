function interpretChange(change) {
  let path = change.path.join('.');
  let summaryString;
  switch (change.kind) {
    case 'E' :
      summaryString = `Property ${path} updated from ${JSON.stringify(change.lhs)} to ${JSON.stringify(change.rhs)}.`;
      break;

    case 'A' :
      summaryString = `Array ${path} was altered at index ${change.index}.`
      break;
    case 'N' :
      summaryString = `${path} was created and set to ${JSON.stringify(change.rhs)}.`
      break;
    case 'D' :
      summaryString = `${path} was deleted.`
      break;
  }

  return summaryString;
}

module.exports = interpretChange;

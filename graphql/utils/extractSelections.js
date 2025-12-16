const {GraphQLResolveInfo} = require('graphql');

const getSelectedFields = (info) => {
  return info.fieldNodes[0].selectionSet?.selections || null;
};

const extractSelections = (info) => {
  const selections = getSelectedFields(info);
  if (!selections) return null;

  return selections.reduce((initialValue, selection) => {
    if (selection.kind === 'Field') {
        return [...initialValue, selection.name.value];
    }
    return initialValue;
  }, []);
};

module.exports = {
  extractSelections,
};
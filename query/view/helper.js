function toMultiFields(baseField, suffix) {
  return [baseField, toSingleField(baseField, suffix)];
}

function toMultiFields2(baseField, suffix1, suffix2, suffix3) {
  return [
    baseField,
    toSingleField(baseField, suffix1),
    toSingleField(baseField, suffix2),
    toSingleField(baseField, suffix3)
  ];
}

function toSingleField(baseField, suffix) {
  // baseField looks like phrase.default or name.default; suffix looks like en, fr....
  const parts = baseField.split('.');
  parts[parts.length - 1] = suffix;
  return parts.join('.');
}

module.exports = { toMultiFields, toMultiFields2, toSingleField };
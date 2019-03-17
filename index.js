function deepdot(obj, objString) {
  const isArgumentsValid = validateArguments(obj, objString);
  if (!isArgumentsValid) return false;
  const levels = getLevels(objString);
  const value = validate(levels, { [levels[0]]: obj });
  return value;
}

function validateArguments(obj, objString) {
  if (!obj || !objString) {
    return false;
  }

  if (typeof obj !== "object") {
    return false;
  }

  if (typeof objString !== "string") {
    return false;
  }

  return true;
}

function getLevels(objString) {
  const re = /(\[[\w\d\s\.\[\]'"!@#$%^&\*\(\)-\+=]+\])|(\]\[)/g;
  return objString
    .replace(re, "%%%$1")
    .replace(/\]\[/g, "]%%%[")
    .split(/%%%|\.(?![\w\d\s\.'"]+\])/);
}

function validate(levels, obj) {
  let value = obj;
  for (let i = 0; i < levels.length; i++) {
    value = getValue(levels[i], value);
    if (value === undefined) return false;
  }
  return value;
}

function getValue(levelName, obj) {
  let name = levelName;
  if (/\[[\w\d\s'"]+\]/.test(name)) {
    name = name.substr(1, name.length - 2);
    name = isNaN(name) ? name.substr(1, name.length - 2) : parseInt(name);
  }
  return obj[name];
}

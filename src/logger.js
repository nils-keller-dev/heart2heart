const getDateTimeString = () => {
  const date = new Date();
  return `[${date.toLocaleDateString()} ${date.toLocaleTimeString()}]`;
};

const consoleLog = (text, error = false) => {
  console[error ? "error" : "log"](text);
};

const log = (text, error) => {
  const message = `${getDateTimeString()} ${text}`;
  consoleLog(message, error);
};

const userLog = (text, userName, error) => {
  const message = `${getDateTimeString()} [${userName}] - ${text}`;
  consoleLog(message, error);
};

export { log, userLog };

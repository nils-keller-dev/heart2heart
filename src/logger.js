const log = (text, ip, error = false) => {
  const date = new Date();
  const message = `[${date.toLocaleDateString()} ${date.toLocaleTimeString()}] ${
    ip ? `${ip} - ` : ""
  }${text}`;
  error ? console.error(message) : console.log(message);
};

export default log;

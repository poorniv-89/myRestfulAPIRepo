export default function (req, res, next) {
  const time = new Date();

  console.log(
    `-----\n${time.toLocaleTimeString()}: Received a ${req.method} request to ${req.url}.`
  );

  if (req.body && Object.keys(req.body).length > 0) {
    console.log('Containing the data:');
    console.log(`${JSON.stringify(req.body)}`);
  }

  next();
}
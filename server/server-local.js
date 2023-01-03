const app = require('./server');
const db = require(`./utils/mysql`)
const server = app.listen(process.env.PORT || 9481, () =>
  db.connect(null, (err) => {
    if (err) {
        process.exit(1)
    } else {
          console.log(`Your app is listening on port ${server.address().port}`)
    }
  })
  
);

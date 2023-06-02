const mongoose = require('mongoose');


const mongodb_URI = process.env['mongodb_URI']
mongoose.connect(mongodb_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(DB => {
    // console.log((DB.connection));
    console.log({ "nombre Base de Datos": mongoose.connection.name });
  })
  .catch(err => {
    console.log(err);
  })
const mongoose = require('mongoose');
const config = require('config');

mongoose.connect(config.get('DB_URI'), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

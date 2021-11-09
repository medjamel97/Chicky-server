const express = require('express');
const app = express();
const port = 3000;

require('./services/crud-utilisateur')(app);
require('./services/crud-message')(app);

app.all('/*', function (req, res) {
    res.send('Route inexistante')
})

app.listen(port, function () {
    console.log('listening on 3000')
})
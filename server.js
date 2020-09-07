const express = require('express');
const compression = require('compression')
const app = express();
let port =9999;
app.use(compression());
app.use(express.static('./build'));

app.listen(port, function () {
    console.log('Server listening on port '+port+'!\n');
});
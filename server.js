const express = require('express');
const webRoutes = require('./routes/web');
const apiRoutes = require('./routes/api');
const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static('public'));

// Allows express to undersatand json req body
app.use(express.json());

// Allows express to understand form data req body
app.use(express.urlencoded({extended: true}));

// Loading web routes
app.use(webRoutes);
app.use('/api', apiRoutes)

// 404 Error if route can't be found
app.get("", (req,res) => {
    res.status(404).send('Page not found');
})

// Gives the link in the console
app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}`);
})
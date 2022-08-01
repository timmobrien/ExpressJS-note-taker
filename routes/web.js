const router = require('express').Router();
const path = require('path');

const publicPath = path.join(__dirname, '..', 'public');

// * 'GET /' should return the index.html
router.get('/', (req, res) => {
    
    res.sendFile(path.join(publicPath, 'index.html'))

})
// 'GET /notes' should return the notes.html
router.get('/notes', (req, res) => {

    res.sendFile(path.join(publicPath, 'notes.html'))

})

// Export routes
module.exports = router;
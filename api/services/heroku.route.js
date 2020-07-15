const router    = require('express').Router();
const axios     = require('axios').default;
const stringify = require('json-stringify-safe');
require('dotenv').config()

router.route('/').all(async(req, res) => {
    axios.post(process.env.herokuRouter_DISCORDHOOK_URL, {
        "content":stringify(req.body, null, 2)
    })
        .then(_response => {
            res.status(204).json(stringify(_response, null, 2))
        })
        .catch(err=> {
            res.status(500).json(stringify(err, null, 2))
        });
})
module.exports = router;
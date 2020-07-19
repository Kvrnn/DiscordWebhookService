const router    = require('express').Router();
const axios     = require('axios').default;
const parser    = require('../utils/parser')
const stringify = require('json-stringify-safe');
require('dotenv').config()

router.route('/').all(async (req,res)=>{
    res.status(400).json('You must configure a route first in the config.env.json file with its accompanying discord webhook url')
})

router.route('/:route').all(async(req, res) => {
    if(req.params.route === 'plaintext'){
        console.log(req)
        res.status(200).end(res.send(stringify(req)))
    } else{
        await parser.publicfunctions.parser(req.body)
            .then(content=>{
                // res.status(200).end('ok')
                axios.post(process.env[req.params.route+'_DISCORDHOOK_URL'], {
                    "content":content
                })
                    .then(_response => {
                        res.status(204).json(stringify(_response, null, 4))
                    })
                    .catch(err=> {
                        res.status(400).json(stringify(err, null, 4))
                    });
            })
            .catch(err=>{
                console.log(err)
                res.status(500).json(err)
            })
    }
})
module.exports = router;
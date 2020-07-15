const router    = require('express').Router();
const axios     = require('axios').default;
const stringify = require('json-stringify-safe');
require('dotenv').config()

router.route('/').all(async(req, res) => {
    let content_array = [];
    for(let attribute in req.body){
        if(typeof(req.body[attribute])==="object"){
            for(let sub_attribute_1 in req.body[attribute]){
                if(typeof(req.body[attribute][sub_attribute_1])==="object"){
                    for(let sub_attribute_2 in req.body[attribute][sub_attribute_1]){
                        content_array.push(attribute+" "+req.body[attribute]+" : "+sub_attribute_1+" "+req.body[attribute][sub_attribute_1]+" : "+sub_attribute_2+" "+req.body[attribute][sub_attribute_1][sub_attribute_2])
                    }
                }
                content_array.push(attribute+" "+req.body[attribute]+" : "+sub_attribute_1+" "+req.body[attribute][sub_attribute_1])
            }
        }
        content_array.push(attribute+" "+req.body[attribute])
    }
    axios.post(process.env.devRouter_DISCORDHOOK_URL, {
        "content":JSON.stringify(content_array, null, 4)
    })
        .then(_response => {
            res.status(204).json(stringify(_response, null, 4))
        })
        .catch(err=> {
            res.status(400).json(stringify(err, null, 4))
        });
})
module.exports = router;
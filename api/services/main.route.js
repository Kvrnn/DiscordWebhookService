const router    = require('express').Router();
const axios     = require('axios').default;
const stringify = require('json-stringify-safe');
require('dotenv').config()

router.route('/').all(async (req,res)=>{
    res.status(400).json('You must configure a route first in the config.env.json file with its accompanying discord webhook url')
})


router.route('/:route').all(async(req, res) => {
    if(req.params.route === 'plaintext'){
        console.log(req.headers)
        res.status(200).end('ok')
    }
    let content_array = [];
    for(let attribute in req.body){
        if(typeof(req.body[attribute])==="object"){
            for(let sub_attribute_1 in req.body[attribute]){
                if(typeof(req.body[attribute][sub_attribute_1])==="object"){
                    for(let sub_attribute_2 in req.body[attribute][sub_attribute_1]){
                        if(typeof(req.body[attribute][sub_attribute_1][sub_attribute_2])==="object"){
                            for(let sub_attribute_3 in req.body[attribute][sub_attribute_1][sub_attribute_2]){
                                if(typeof(req.body[attribute][sub_attribute_1][sub_attribute_2][sub_attribute_3])==="object"){
                                    content_array.push(attribute+" : "+sub_attribute_1+" : "+sub_attribute_2+" : "+sub_attribute_3+" : "+req.body[attribute][sub_attribute_1][sub_attribute_2][sub_attribute_3]+" = 5th dimensional arrays not support yet ")
                                } else{
                                    content_array.push(attribute+" : "+sub_attribute_1+" : "+sub_attribute_2+" : "+sub_attribute_3+" = "+req.body[attribute][sub_attribute_1][sub_attribute_2][sub_attribute_3])
                                }
                            }
                        }
                        content_array.push(attribute+" : "+sub_attribute_1+" : "+sub_attribute_2+" = "+req.body[attribute][sub_attribute_1][sub_attribute_2])
                    }
                }
                content_array.push(attribute+" : "+sub_attribute_1+" = "+req.body[attribute][sub_attribute_1])
            }
        }
        content_array.push(attribute+" = "+req.body[attribute])
    }
    // let array = JSON.stringify(content_array, null, 4)
    // if(0<= array.length/2000 && array.length/2000 <=1){
    //     console.log(array.length/2000)
    // } else{
    //     console.log(array.length/2000)
    // }
    // res.status(200).json(array)
    axios.post(process.env[req.params.route+'_DISCORDHOOK_URL'], {
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
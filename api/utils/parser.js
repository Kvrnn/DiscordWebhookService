const stringify = require('json-stringify-safe');

class publicfunctions{
    /**
     * Parses thru a request and sends back a array with string type
     *
     * @function
     * @param {request} req
     */
    static async parser(req) {
        let content_array = [];
        for(let attribute in req){
            if(typeof(req[attribute])==="object"){
                for(let sub_attribute_1 in req[attribute]){
                    if(typeof(req[attribute][sub_attribute_1])==="object"){
                        for(let sub_attribute_2 in req[attribute][sub_attribute_1]){
                            if(typeof(req[attribute][sub_attribute_1][sub_attribute_2])==="object"){
                                for(let sub_attribute_3 in req[attribute][sub_attribute_1][sub_attribute_2]){
                                    if(typeof(req[attribute][sub_attribute_1][sub_attribute_2][sub_attribute_3])==="object"){
                                        content_array.push(attribute+" : "+sub_attribute_1+" : "+sub_attribute_2+" : "+sub_attribute_3+" : "+req[attribute][sub_attribute_1][sub_attribute_2][sub_attribute_3]+" = 5th dimensional arrays not support yet ")
                                    } else{
                                        content_array.push(attribute+" : "+sub_attribute_1+" : "+sub_attribute_2+" : "+sub_attribute_3+" = "+req[attribute][sub_attribute_1][sub_attribute_2][sub_attribute_3])
                                    }
                                }
                            } else{
                                content_array.push(attribute+" : "+sub_attribute_1+" : "+sub_attribute_2+" = "+req[attribute][sub_attribute_1][sub_attribute_2])
                            }
                        }
                    } else{
                        content_array.push(attribute+" : "+sub_attribute_1+" = "+req[attribute][sub_attribute_1])
                    }
                }
            } else{
                content_array.push(attribute+" = "+req[attribute])
            }
        }
        return privatefunctions.cleaner(stringify(content_array, null, 4))
    }
}

class privatefunctions{
    /**
     * Parses thru a request and sends back a array with string type
     *
     * @function
     * @param {string} string
     */
     static cleaner(string){
        string = string.replace(/\[/gi,''); string = string.replace(/]/gi,''); string = string.replace(/ /gi,'')
        return string
    }
    /**
     * Checks the word count and splits the content if >2000 characters is reached (WIP)
     * */
    static split(string){
        console.log(string.length)
        if(typeof(string)==='string' && string.length){
            if((string.length/2000)<=1){
                return true
            } else{
                return privatefunctions.cleaner(stringify(string, null, 4)).match(/[\s\S]{1,2000}/g) || []
            }
        } else{
            return undefined
        }
    }
}

exports.publicfunctions = publicfunctions;
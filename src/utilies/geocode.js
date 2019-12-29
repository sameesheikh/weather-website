const request=require('request')

const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoic2FtZWVic2wiLCJhIjoiY2s0ZWE5ZnZkMGFxcDNsbzM1Y3MxMG55YiJ9.MQWL3mIk1p9LFZoWQ-tw6A'
    request({ url, json:true},(error,{body})=>{
        if(error) {
            callback('There are some problem in location findings',undefined)
        } else if(body.features.length===0) {
            callback('Location doesnot exixts. Try another',undefined)
        } else {
            callback(undefined,{
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].place_name
            })
        }
    })
}

module.exports=geocode
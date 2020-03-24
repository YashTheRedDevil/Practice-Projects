const request=require('request');

const geoCode=(address,callback)=>{
    const url =
      "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoieWFzaHRoZXJlZGRldmlsIiwiYSI6ImNrN3p2OXcyZDA5MW0zZW83MWRkMzhqbTAifQ.tSy_ok0FjZaZ6exVMZ_jzg&limit=1";
    
      //Destructring
      request({url,json:true},(error,{body})=>{
        if(error)  
        {
            callback('Error while connecting to the service',undefined);
        }
        else if(body.features.length===0)
        {
            callback('Unable to find the location. Try with another search!',undefined);
        }
        else
        {
            callback(undefined,{
                location:body.features[0].place_name,
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0]
            });
        }
      })
    }
    
module.exports=geoCode;
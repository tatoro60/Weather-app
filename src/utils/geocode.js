const request = require("request");
const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address +
    ".json?access_token=pk.eyJ1IjoidGF0b3JvNjAiLCJhIjoiY2tsMm1vNTcxMGJ1aDJxbW5nNXd6bm9iMSJ9.IX8xjy27VwOtinNcxpRlSw&limit=1";
  request(
    {
      url,
      json: true,
    },
    (error, { body }) => {
      if (error) {
        callback("Unable to connect to location service", undefined);
      } else if (body.features.length === 0) {
        callback("Unable to find location", undefined);
      } else {
        callback(undefined, {
          latitude: body.features[0].center[1],
          longitude: body.features[0].center[0],
          location: body.features[0].place_name,
        });
      }
    }
  );
};
module.exports = geocode;

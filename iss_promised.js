const request = require("request-promise-native");
const addressApi = "https://api.ipify.org?format=json";

const fetchMyIP = () => {
  return request(addressApi);
};

const fetchCoordsByIP = function (objIp) {
  const ip = JSON.parse(objIp).ip;
  return request(`http://ipwho.is/${ip}`);
};

const fetchISSFlyOverTimes = function (jsonBody) {
  const { latitude, longitude } = JSON.parse(jsonBody);
  const issUrl = `https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`;
  return request(issUrl);
};

const nextISSTimesForMyLocation = function () {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};

module.exports = { nextISSTimesForMyLocation };

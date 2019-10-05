
var zipcodes = require('zipcodes');

var geo = {

  set: function(obj, config){

    var returnObj = {};

    returnObj.Orig = zipcodes.lookup(obj.params.SourceZipCode);
    returnObj.Dest = zipcodes.lookup(obj.params.DestinationZipCode);

    return returnObj;
  },

  zipData: {},

  zipIndex: {
    start: 0,
    end: 20,
    page: 0,
  },

  getZip: function(zip){

    var obj = zipcodes.lookup(zip);

    return obj;
  },

  getDistance: function(origin, dest){

    var dist = zipcodes.distance(origin, dest);

    return dist;
  },
  recommendation_gen: function(row, rows, obj){

    //obj is config

    var i = 0;
    var net_distance = []; //source to source, source to dest, dest to source, dest to dest, net
    var lane = row;
    var tempLane = {};

    var distance_data = {};

    var distance_list = [];

    for(var keys in rows){

      tempLane = rows[keys];

      if(rows[keys].Orig != undefined && rows[keys].Dest != undefined){
        net_distance[0] = geo.distance_cal.getDistanceFromLatLonInKm(lane.Orig.latitude, lane.Orig.longitude, tempLane.Orig.latitude, tempLane.Orig.longitude);
        net_distance[1] = geo.distance_cal.getDistanceFromLatLonInKm(lane.Orig.latitude, lane.Orig.longitude, tempLane.Dest.latitude, tempLane.Dest.longitude);
        net_distance[2] = geo.distance_cal.getDistanceFromLatLonInKm(lane.Dest.latitude, lane.Dest.longitude, tempLane.Orig.latitude, tempLane.Orig.longitude);
        net_distance[3] = geo.distance_cal.getDistanceFromLatLonInKm(lane.Dest.latitude, lane.Dest.longitude, tempLane.Dest.latitude, tempLane.Dest.longitude);
        net_distance = geo.determine_net(net_distance);

        distance_data.tempLane = tempLane;
        distance_data.net_distance = net_distance;
        distance_data.net_distance.net = Math.round(net_distance[4]);

        distance_list.push(distance_data);

        distance_data = {};
        net_distance = [];
      }

    }

    distance_list.sort(geo.sortObj);

    for(var j = 0; j < distance_list.length; j++){
      distance_list[j].tempLane.check = false;
      distance_list[j].tempLane.index = j+1;
    }

    return distance_list;

  },

  sortObj: function(a, b){
    if ( a.net_distance[4] < b.net_distance[4] ){
      return -1;
    }
    if ( a.net_distance[4] > b.net_distance[4] ){
      return 1;
    }
    return 0;
  },

  determine_net: function(net_distance){

    var test1 = net_distance[0] + net_distance[3];
    var test2 = net_distance[1] + net_distance[2];

    if(test1 < test2){
      net_distance[4] = test1;
      net_distance[5] = {org: "org", dest: "dest"};
    }
    else {
      net_distance[4] = test2;
      net_distance[5] = {org: "dest", dest: "org"};
    }

    return net_distance;
  },

  distance_cal: {
    getDistanceFromLatLonInKm: function(lat1,lon1,lat2,lon2){
      var R = 6371; // Radius of the earth in km
      var dLat = geo.distance_cal.deg2rad(lat2 - lat1);  // deg2rad below
      var dLon = geo.distance_cal.deg2rad(lon2 - lon1);
      var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(geo.distance_cal.deg2rad(lat1)) * Math.cos(geo.distance_cal.deg2rad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      var d = R * c * 0.621371 * 1.1; // Distance in miles
      return d;
    },
    deg2rad: function(deg){
      return deg * (Math.PI/180)
    }
  },
}

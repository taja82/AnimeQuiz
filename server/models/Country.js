var mongoose = require("mongoose");

// schema
var animeSchema = mongoose.Schema({
  country:{type:String},
  country_code:{type:String},
});

var AnimeInfo = mongoose.model("country", animeSchema);
module.exports = AnimeInfo;
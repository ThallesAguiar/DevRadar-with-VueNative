const User = require("../model/User");
// const parseStringAsArray = require('../../utils/parseStringAsArray');


class SearchController {
  async index(req, res) {
    const { 
      latitude, 
      longitude, 
      // passions 
    } = req.query;

    // const passionsArray = parseStringAsArray(passions);

    const users = await User.find({
      // passions: {
      //   $in: passionsArray,
      // },
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
          $maxDistance: 100000 //maximo de distancia, 100 mil metros = 100Km
        },
      },
    });

    return res.json({ users });
  }
};


module.exports = new SearchController();
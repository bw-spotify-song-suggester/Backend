const csv = require('csvtojson');
const csvFilePath = './database/seeds/BE_database_info.csv';

exports.seed = function (knex) {

  return csv()
    .fromFile(csvFilePath)
    .then((jsonArr) => {
      const newArray = jsonArr.filter((song, index) => {
        if (index < 100) {
          return song
        }
      })
      console.log("array length", newArray.length);
      return knex('songs').insert(newArray);

    })
}




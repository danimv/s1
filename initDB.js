const mongoose = require("mongoose");
const contribTypes = require("./models/contribTypes");

const data = [
  {
    name: "Transport",
    description: "Indica els kilometres realitzats",
    unit: "Kilometre"
  },
  {
    name: "Reciclar",
    description: "Indica la quantitat de material reciclat",
    unit: "Kilogram"
  },
    {
    name: "Aigua",
    description: "Indica els litres consumits",
    unit: "Litre"
  },
  {
    name: "Electricitat",
    description: "Indica els Watts consumits",
    unit: "Watt",
  },
];

async function initDB() {
  const collection = mongoose.model('contribtypes');
  const count = await collection.countDocuments();
  if (count === 0) {
    data.forEach(function (seed) {
      contribTypes.create(seed, function (err, contribTypes) {
        if (err) {
          console.log(err);
        } else {
          console.log("type added");
        }
      });
    });
  }
}

module.exports = initDB;

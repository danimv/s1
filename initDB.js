const mongoose = require("mongoose");
const contribTypesModel = require("./models/contribTypesModel");
const contribModel = require("./models/contribModel");

const contribTypes = [
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

const contrib = [
  {
    name: "Transport fins feina",
    description: "",
    tipus: "Transport",
    quantitat: "12",
    unitat: "Kilometre",    
  },
  {
    name: "Reciclatge deixalles",
    description: "",
    tipus: "Reciclar",
    quantitat: "2",
    unitat: "Kilogram", 
  },
    {
    name: "Aigua dutxa",
    description: "",
    tipus: "Aigua",
    quantitat: "23",
    unitat: "Litre", 
  },
  {
    name: "Electricitat televisió",
    description: "",
    tipus: "Electricitat",
    quantitat: "230",
    unitat: "Watt", 
  },
];

async function init(db, data, model) {
  const collection = mongoose.model(db);
  const count = await collection.countDocuments();
  if (count === 0) {
    data.forEach(function (seed) {
      model.create(seed, function (err, model) {
        if (err) {
          console.log(err);
        } else {
          console.log("new " + db + " added");
        }
      });
    });
  }
}

const initDB = () =>  {
  init('contribtypes',contribTypes,contribTypesModel);
  init('contrib',contrib,contribModel);
};


module.exports = initDB;

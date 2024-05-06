// const fs = require('fs');
// const path = require('path');
// module.exports = (req, res) =>{
//     const searchJSON = path.join(__dirname,"../../dataBase/products.json")
//     let products = JSON.parse(fs.readFileSync(searchJSON, 'utf-8'))
//     res.render("./products/listProduct",{
//       products: products,
//     })
// }

const db = require("../../dataBase/models")
module.exports = (req, res) => {
  db.product.findAll({
    where: {
      available: true,
    },
  }).then((products) => {
    res.render("products/list", { products });
  });
};
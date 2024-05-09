const db = require("../../dataBase/models");

module.exports = (req, res) => {
  const {
    name,
    description,
    manufacturer,
    mark,
    sku,
    available,
    colection,
    price,
    line,
    character,
    characterVersion,
    minAge,
    height,
    depth,
    width,
    materials,
    initialScale,
    articulated,
    collectable,
    accessories,
    bobbleHead,
    newImages,
  } = req.body;

 db.product.create({
    name: name.trim(),
    description: description.trim(),
    manufacturer: manufacturer.trim(),
    mark: mark.trim(),
    sku: +sku,
    available: available == 'yes'? 1 : 0,
    collection: colection.trim(),
    price: +price,
    line: line.trim(),
    character: character.trim(),
    characterVersion: characterVersion.trim(),
    minAge: minAge?.trim(),
    height: +height,
    depth: +depth,
    width: +width,
    materials: materials?.trim(),
    scale: +initialScale,
    articulated: articulated == 'yes'? 1:0,
    collectable: collectable == 'yes'?1:0,
    accessories: accessories == 'yes'?1:0,
    bobbleHead: bobbleHead == 'yes'?1:0,
    firstImg: req.files.firstImg?.length
      ? req.files.firstImg[0]?.filename
      : "default-image.jpg",
    secondImg: newImages?.length? newImages : ["default-image.jpg"],
  })
  .then((product) => {
    let newImages = [];
    if (req.files?.imagesSecondary?.length) {
        newImages = req.files.imagesSecondary?.map((img) => {
            return {
                file: img.filename,
                productId: product.id
            }
        })
        db.imagesecondary.bulkCreate(newImages)
        .then(() => {
            return res.redirect(`/admin/productos`)
        })
        .catch(err => {
            res.send(err.message)
        })
    }
    // return res.redirect(`/admin/productos`)
    res.redirect(`/productos/detalle-producto/${product.id}`);
})

  // products.push(newProduct);
  // saveData(products, "products");
};


/* anterior codigo 
const { loadData, saveData } = require("../../dataBase");

module.exports = (req, res) => {
  const {
    name,
    description,
    manufacturer,
    mark,
    sku,
    available,
    colection,
    price,
    line,
    character,
    characterVersion,
    minAge,
    height,
    depth,
    width,
    materials,
    scale,
    articulated,
    collectable,
    accessories,
    bobbleHead,
  } = req.body;

  let newImages = [];
  if (req.files.secondImg?.length) {
    newImages = req.files.secondImg?.map((img) => img.filename);
  }

  const products = loadData("products");
  const newID = products[products.length - 1].id + 1;
  const newProduct = {
    id: newID,
    name: name.trim(),
    description: description.trim(),
    manufacturer: manufacturer.trim(),
    mark: mark.trim(),
    sku: +sku,
    available: available?.trim(),
    colection: colection.trim(),
    price: +price,
    line: line.trim(),
    character: character.trim(),
    characterVersion: characterVersion.trim(),
    minAge: minAge?.trim(),
    height: +height,
    depth: +depth,
    width: +width,
    materials: materials?.trim(),
    scale: +scale,
    articulated: articulated?.trim(),
    collectable: collectable?.trim(),
    accessories: accessories?.trim(),
    bobbleHead: bobbleHead?.trim(),
    firstImg: req.files.firstImg?.length
      ? req.files.firstImg[0]?.filename
      : "default-image.jpg",
    secondImg: newImages.length ? newImages : ["default-image.jpg"],
  };

  products.push(newProduct);
  saveData(products, "products");
  res.redirect(`/productos/detalle-producto/${newID}`);
};
*/
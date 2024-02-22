const express = require("express");
const app = express();
const path = require("path");
const port = 3030;

app.use(express.static('public'))

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/home.html"));
});
app.get("/registro", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/registro.html"));
});
app.get("/registro-paso-2", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/registro-1.html"));
});
app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/login.html"));
});

/** Configuración ruta carrito **/
app.get("/carrito", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/cart.html"));
});

app.get("/detalle", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/detail.html"));
});
app.get("/registro-paso-3", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/registro-2.html"));
});
app.get("/inicio", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/home.html"));
});
app.listen(port,()=>{console.log(`http://localhost:${port}`)})

/* EJS */
app.use("views",path.join(__dirname, "./views"))

app.set("view engine","ejs")
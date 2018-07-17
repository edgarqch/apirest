var express = require('express');
var router = express.Router();
var User = require("../../../database/collections/user");

//CRUD Create, Read, Update, Delete
//Creation of users
router.post("/user", (req, res) => {
    if (req.body.name == "" && req.body.email == "") {
        res.status(400).json({
            "msn": "formato incorrecto"
        });
        return;
    }
    var user = {
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        sexo: req.body.sexo
    };
    var userData = new User(user);
    userData.save().then(() => {
        //el json cambia el methodo content-type
        res.status(200).json({
            "msn": "usuario registrado con exito"
        });
    });
});

//Read all users
router.get("/user", (req, res) => {
    User.find({}).exec((error, docs) => {
        res.status(200).json(docs);
    });
});

//Read only one user
router.get(/user\/[a-z0-9]{1,}$/, (req, res) => {
    var url = req.url;
    var id = url.split("/")[2];
    User.findOne({ _id: id }).exec((error, docs) => {
        if (docs != null) {
            res.status(200).json(docs);
            return;
        }
        res.status(200).json({
            "msn": "No existe el recurso"
        });
    });
    //console.log(id);
});

//Delete user
router.delete(/user\/[a-z0-9]{1,}$/, (req, res) => {
    var url = req.url;
    var id = url.split("/")[2];
    User.find({ _id: id }).remove().exec((err, docs) => {
        res.status(200).json(docs);
    });
});





/* GET home page. */
router.post('/imc', function(req, res, next) {
    var imc = Number(req.body.masa) / Math.pow(Number(req.body.altura), 2)
    if (imc < 16) {
        res.send({
            "msn": "Delgadez moderada"
        });
    } else if (imc > 17 && imc < 18.49) {
        res.send({
            "msn": "Delgadez leve"
        });
    } else if (imc >= 18.5 && imc <= 24.99) {
        res.send({
            "msn": "Normal"
        });
    } else if (imc >= 25 && imc <= 29.99) {
        res.send({
            "msn": "Sobre Peso"
        });
    } else if (imc >= 30 && imc <= 39.99) {
        res.send({
            "msn": "Obesidad"
        });
    } else if (imc >= 40) {
        res.send({
            "msn": "Obesidad Morvida"
        });
    } else {
        res.send({
            "msn": "Error en los datos"
        });
    }
    //res.render('index', { title: 'Express' });
});

router.post('/kcal', function(req, res, next) {
    var information = [
        "Albóndigas 100g 202 kcal 848 kj",
        "Arroz frito 100g 186",
        "Papa frita",
        "Carne asada",
        "Pollo frito",
        "Pollo spiedo",
        "Pollo broaster",
        "Carne con tomate",
        "Ensalada Cesar",
        "Ensalada Rusa",
        "Pizza Italiana",
        "Taco",
        "Pure de papas"
    ];
    var wordkey = req.body.wordkey;
    var expreg = new RegExp(wordkey);
    var result = information.filter((key) => {
        if (key.search(expreg) > -1) {
            return true;
        }
        return false;
    });
    res.send({
        "wordkey": wordkey,
        "result": result
    });

});


module.exports = router;
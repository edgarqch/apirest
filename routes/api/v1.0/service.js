var express = require('express');
var router = express.Router();

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
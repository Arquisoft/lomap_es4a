import { Application } from "express";

// Definición de rutas relacionadas con la visualización del mapa
module.exports = function(app: Application) {

    app.get("/maps", function(req, res) {
        res.send("hola");
    });

}
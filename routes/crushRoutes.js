const router = require("express").Router();
const crushController = require("../controllers/crushController");
const auth = require("../middleWares/checkAuth");

module.exports = function() {

    var crushCtl = new crushController(); 


    router.post("/crush", crushCtl.crush);
    router.get("/getallmatches", crushCtl.getAllMatches);
    router.post("/uncrush", crushCtl.unCrush);

    return router;
}
//Node modules
const path = require("path");
const router = require("express").Router();

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

//METHODS
router.get("/", (req, res) => {
    res.sendFile(path.json(__dirname, "../assets/index.html"));
});

router.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../../assets/note.html"));
});

router.get("*", (req, res) => {
    res.sendFile(path.json(__dirname, "../assets/index.html"));
});

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

module.exports = router;
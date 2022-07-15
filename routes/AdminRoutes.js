const { saveUser } = require("../controller/AdminController");
const db = require("../config/db");

router.get("/getUsers", async (req, res) => {
  try {
    let results = await db.all();
    res.json(results);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: error + "" });
  }
});

router.post("/bankaccount", async (req, res) => {
  try {
    let result = await saveUser(req.body);
    res.status(result.status_code).json(result);
  } catch (error) {
    res.status(500).json({ error: error + "" });
  }
});

module.exports = router;

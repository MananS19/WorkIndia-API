const { login, getBalance } = require("../controller/AccountController");

router.post("/login", async (req, res) => {
  try {
    let result = await login(req.body);
    res.status(result.status_code).json(result);
  } catch (error) {
    res.status(500).json({ error: error + "" });
  }
});

router.get("/balance", async (req, res) => {
  try {
    let result = await getBalance(req.query.account_no);
    res.status(result.status_code).json(result.data);
  } catch (error) {
    res.status(500).json({ error: error + "" });
  }
});

module.exports = router;

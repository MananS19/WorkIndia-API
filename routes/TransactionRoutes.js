const { transfer, add } = require("../controller/TransactionController");

router.post("/transfer", async (req, res) => {
  try {
    let result = await transfer(req.body);
    res.status(result.status_code).json(result.data);
  } catch (error) {
    res.status(500).json({ error: error + "" });
  }
});

router.post("/add", async (req, res) => {
  try {
    let result = await add(req.query.account_no, req.body);
    res.status(result.status_code).json(result);
  } catch (error) {
    res.status(500).json({ error: error + "" });
  }
});

module.exports = router;

const {
  getAllTransaction,
} = require("../controller/AdminTransactionsController");

router.get("/transactions/", async (req, res) => {
  try {
    let start = new Date(req.query.start_date);
    let end = new Date(req.query.end_date);
    let sort = req.query.sort_by_date;
    let result = await getAllTransaction(start, end, sort);
    res.status(result.status_code).json(result);
  } catch (error) {
    res.status(500).json({ error: error + "" });
  }
});

module.exports = router;

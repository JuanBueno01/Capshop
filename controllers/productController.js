exports.getMenu = async (req, res) => {
    const search = req.query.search || "";
    const category = req.query.category || "";
    const price = req.query.price || "";
    const userName = req.query.user || "Invitado";

    let query = "SELECT * FROM products WHERE 1=1";

    if (search) query += ` AND name LIKE '%${search}%'`;
    if (category) query += ` AND category = '${category}'`;
    if (price === "low") query += " ORDER BY price ASC";
    if (price === "high") query += " ORDER BY price DESC";

    db.query(query, (err, results) => {
        res.render("menu", { products: results, userName });
    });
};

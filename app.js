const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const path = require("path");

const app = express();
const port = 3000;

app.use(cors());
app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "uploads")));

// Routes Module
const index = require("./Routes/index");
const productRouter = require("./app/product/routes");
const productRouterV2 = require("./app/product-v2/routes");

// Routes Use
app.use(index);
app.use("/api/v1", productRouter);
app.use("/api/v2", productRouterV2);
app.use((req, res) => {
	res.status(404);
	res.send({
		status: "failed",
		message: `${req.originalUrl} not found`,
	});
});

app.listen(process.env.PORT || port, () =>
	console.log(`Server running on http://localhost:${port}`)
);

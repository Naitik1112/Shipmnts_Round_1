const path = require("path");
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const AppError = require("./utils/appError");
// const userRouter = require('./routes/userRoutes');
const shipmentsRouter = require("./routes/shipmentsRoutes");

const app = express();

const corsOptions = {
  origin: [process.env.BACKEND_URL, process.env.FRONTEND_URL],
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(cookieParser());

app.set("trust proxy", 1);

// 1) MIDDLEWARES
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

// 3) ROUTES
// app.use('/api/v1/users', userRouter);
app.use("/api/v1/shipments", shipmentsRouter);

// 4) 404 Handler
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

module.exports = app;

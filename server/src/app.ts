import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors, { CorsOptions } from "cors";
import helmet from "helmet";
import ErrorMiddleware from "./middlewares/error.js";

import user from "./routes/user.route.js";
import dna from "./routes/dna.route.js";

const app = express();

const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
        const allowedOrigins = [
			"http://localhost:5173",
			"http://localhost:5174",
        ];
        if (!origin || allowedOrigins.includes(origin as string)) {
            callback(null, origin);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
};

app.set('trust proxy', 1);
app.use(cors(corsOptions));
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb" }));
app.use(express.static("public"));

app.use("/api/v1/user", user);
app.use("/api/v1/dna", dna);

app.use(ErrorMiddleware);

export default app;
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const morgan_1 = __importDefault(require("morgan"));
const express_session_1 = __importDefault(require("express-session"));
const nocache_1 = __importDefault(require("nocache"));
const db_1 = __importDefault(require("./config/db"));
const app = (0, express_1.default)();
(0, db_1.default)();
app.use((0, nocache_1.default)());
app.use((0, express_session_1.default)({
    secret: "somesecretkey",
    resave: false,
    saveUninitialized: true,
}));
app.use((0, morgan_1.default)("dev"));
// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path_1.default.join(__dirname, "views"));
// Static files for serving compiled TypeScript
app.use(express_1.default.static(path_1.default.join(__dirname, "../dist/public")));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Routes
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
app.use("/", userRoutes_1.default);
app.use("/admin", adminRoutes_1.default);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

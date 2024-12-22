"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLoggedIn = exports.isAdmin = void 0;
const isAdmin = (req, res, next) => {
    if (req.session && req.session.admin) {
        return next();
    }
    res.redirect("/login");
};
exports.isAdmin = isAdmin;
const isLoggedIn = async (req, res, next) => {
    if (req.session && req.session.user) {
        return next();
    }
    res.redirect("/login");
};
exports.isLoggedIn = isLoggedIn;

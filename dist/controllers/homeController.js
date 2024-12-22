"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHome = void 0;
const getHome = (req, res) => {
    res.render('index', { title: 'Home' });
};
exports.getHome = getHome;

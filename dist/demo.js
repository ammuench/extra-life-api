"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
index_1.getTeamInfo(44504, false)
    .then((data) => {
    console.log(data);
})
    .catch((e) => {
    console.log(e);
});

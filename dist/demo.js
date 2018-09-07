"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
index_1.getTeamRoster(38961)
    .then((data) => {
    console.log(data.members);
})
    .catch((e) => {
    console.log(e);
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
index_1.getTeamRoster(44504, 1)
    .then((data) => {
    console.log(data.members.length);
})
    .catch((e) => {
    console.log(e);
});

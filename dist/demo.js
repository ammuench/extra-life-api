"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const elAPI = require("./index");
elAPI.getTeamRoster;
index_1.getTeamDonations(38961, 5)
    .then((data) => {
    console.log(data);
})
    .catch((e) => {
    console.log(e);
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
index_1.getUserDonations(484672)
    .then((data) => {
        console.log(data);
    })
    .catch((err) => {
        console.log(err);
    });
index_1.getTeamInfo(60878, false)
    .then((data) => {
        console.log(data);
    })
    .catch((e) => {
        console.log(e);
    });
index_1.getTeamDonations(60878, 50)
    .then((data) => {
        console.log(data);
    })
    .catch((e) => {
        console.log(e);
    });
index_1.getUserInfo(484672)
    .then((data) => {
        console.log(data);
    })
    .catch((err) => {
        console.log(err);
    });
index_1.getTeamRoster(60878)
    .then((data) => {
        console.log(data.members[0]?.links);
    })
    .catch((err) => {
        console.log(err);
    });

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const demoUser = 484672;
const demoTeam = 60878;
index_1.getUserInfo(demoUser)
    .then((data) => {
    console.log(data);
})
    .catch((err) => {
    console.error(err);
});
index_1.getUserDonations(demoUser)
    .then((data) => {
    console.log(data);
})
    .catch((err) => {
    console.error(err);
});
index_1.getUserMilestones(demoUser)
    .then((data) => {
    console.log(data);
})
    .catch((err) => {
    console.error(err);
});
index_1.getUserIncentives(demoUser)
    .then((data) => {
    console.log(data);
})
    .catch((err) => {
    console.error(err);
});
index_1.getUserBadges(demoUser)
    .then((data) => {
    console.log(data);
})
    .catch((err) => {
    console.error(err);
});
index_1.getTeamInfo(demoTeam, false)
    .then((data) => {
    console.log(data);
})
    .catch((err) => {
    console.error(err);
});
index_1.getTeamDonations(demoTeam, 50)
    .then((data) => {
    console.log(data);
})
    .catch((err) => {
    console.error(err);
});
index_1.getTeamRoster(demoTeam)
    .then((data) => {
    console.log(data);
})
    .catch((err) => {
    console.error(err);
});

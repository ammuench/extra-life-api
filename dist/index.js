"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request");
const api_paths_1 = require("./helpers/api-paths");
exports.getUserInfo = (id) => __awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        const url = api_paths_1.apiPaths.profileUrl(id);
        let userInfoJson = {};
        request(url, (error, response) => {
            if (!error && response) {
                try {
                    userInfoJson = JSON.parse(response.body);
                    userInfoJson.avatarImageURL = 'https:' + userInfoJson.avatarImageURL;
                    userInfoJson.donateURL = `https://www.extra-life.org/index.cfm?fuseaction=donate.participant&participantID=${id}`;
                    if (userInfoJson.teamID) {
                        exports.getTeamInfo(userInfoJson.teamID, false)
                            .then((data) => {
                            userInfoJson.teamURL = data.teamURL;
                            resolve(userInfoJson);
                        }).catch((reason) => {
                            reject(reason);
                        });
                    }
                    else {
                        resolve(userInfoJson);
                    }
                }
                catch (e) {
                    reject(e);
                }
            }
            else {
                console.log('Error parsing userInfo URL');
                reject('There was an error trying to make your request');
            }
        });
    });
});
exports.getUserDonations = (id, limit = 0, page = 1) => __awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        const url = api_paths_1.apiPaths.userDonationUrl(id, limit, page);
        const userDonationsJson = {};
        request(url, (error, response) => {
            if (!error && response) {
                try {
                    userDonationsJson.countDonations = response.headers['x-total-records'] || 0;
                    userDonationsJson.countPages = Math.ceil(userDonationsJson.countDonations / 100);
                    userDonationsJson.donations = JSON.parse(response.body);
                    resolve(userDonationsJson);
                }
                catch (e) {
                    reject(e);
                }
            }
            else {
                console.log('Error parsing userDonations URL');
                reject('There was an error trying to make your request');
            }
        });
    });
});
exports.getTeamInfo = (id, fetchRoster = true) => __awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        const url = api_paths_1.apiPaths.teamProfileUrl(id);
        let teamInfoJson = {};
        request(url, (error, response) => {
            if (!error && response) {
                try {
                    teamInfoJson = JSON.parse(response.body);
                }
                catch (e) {
                    reject(e);
                }
                teamInfoJson.avatarImageURL = 'http:' + teamInfoJson.avatarImageURL;
                teamInfoJson.teamURL = `https://www.extra-life.org/index.cfm?fuseaction=donorDrive.team&teamID=${id}`;
                if (fetchRoster) {
                    exports.getTeamRoster(id)
                        .then((data) => {
                        console.log(data);
                        teamInfoJson.members = data.members.map((u) => {
                            u.URL = `https://www.extra-life.org/index.cfm?fuseaction=donorDrive.participant&participantID=${u.participantID}`;
                            return u;
                        });
                        resolve(teamInfoJson);
                    }).catch((reason) => {
                        reject(reason);
                    });
                }
                else {
                    resolve(teamInfoJson);
                }
            }
            else {
                console.log('Error obtaining team info');
                reject('There was an error trying to make your request');
            }
        });
    });
});
exports.getTeamDonations = (id, limit = 100, page = 1) => __awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        const teamDonationsJson = {};
        const url = api_paths_1.apiPaths.teamDonationsUrl(id, limit, page);
        request(url, (error, response) => {
            if (!error && response) {
                try {
                    teamDonationsJson.countDonations = response.headers['num-records'] || 0;
                    teamDonationsJson.countPages = Math.ceil(teamDonationsJson.countDonations / 100);
                    teamDonationsJson.donations = JSON.parse(response.body);
                }
                catch (e) {
                    reject(e);
                }
                resolve(teamDonationsJson);
            }
            else {
                console.log('Error parsing teamDonations URL');
                reject('There was an error trying to make your request');
            }
        });
    });
});
exports.getTeamRoster = (id) => __awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        const teamRosterJson = {};
        const url = api_paths_1.apiPaths.teamRosterUrl(id);
        request(url, (error, response) => {
            if (!error && response) {
                try {
                    teamRosterJson.countMembers = response.headers['num-records'] || 0;
                    teamRosterJson.countPages = Math.ceil(teamRosterJson.countMembers / 100);
                    teamRosterJson.members = JSON.parse(response.body);
                }
                catch (e) {
                    reject(e);
                }
                teamRosterJson.members.forEach((member) => {
                    member.avatarImageURL = 'https:' + member.avatarImageURL;
                    member.profileURL = `https://www.extra-life.org/index.cfm?fuseaction=donorDrive.participants&participantID=${member.participantID}`;
                });
                resolve(teamRosterJson);
            }
            else {
                console.log('Error parsing teamRoster URL');
                reject('There was an error trying to make your request');
            }
        });
    });
});

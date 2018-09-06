import * as request from 'request';

const domain = 'https://www.extra-life.org/'
const limit = 100
const donationsUrl = `${domain}api/participants/{0}/donations?limit=${limit.toString()}&offset={1}`;
const profileUrl = `${domain}api/participants/{0}`;
const teamDonationsUrl = `${domain}api/teams/{0}/donations?limit=${limit.toString()}&offset={1}`;
const teamProfileUrl = `${domain}api/teams/{0}`;
const teamRosterUrl = `${domain}api/teams/{0}/participants?limit=${limit.toString()}&offset={1}`;

/**
   * Gets the extra life info of a user
   * @param id - the user participant ID
   * @param team - whether to return team info or not
   * @return result - the promise for completion of function (async)
   */
export const getUserInfo = async (id: string | number, team = true): Promise<any> => {
    return new Promise((resolve, reject) => {
        let url = String.format(profileUrl, id);
        let userInfoJson = {};

        request(url, (error: any, response: any) => {
            if (!error && response) {
                try {
                    userInfoJson = JSON.parse(response.body);
                } catch (e) {
                    return reject(e);
                }
                userInfoJson.avatarImageURL = 'https:' + userInfoJson.avatarImageURL;
                userInfoJson.donateURL = domain + 'index.cfm?fuseaction=donate.participant&participantID=' + id;

                if (userInfoJson.teamID && team) {
                    module.exports.getTeamInfo(userInfoJson.teamID).then((data) => {
                        userInfoJson.teamName = data.name;
                        userInfoJson.teamURL = data.teamURL;

                        resolve(userInfoJson);
                    }).catch((reason) => {
                        return reject(reason);
                    });
                } else {
                    resolve(userInfoJson);
                }
            } else {
                console.log('Error parsing userInfo URL');
                return reject('There was an error trying to make your request');
            }
        });
    });
};

/**
 * Gets the recent donations of a user
 * @param {String | Number} id - the user participant ID
 * @param {Number} page - the page number to return
 * @return {Promise} result - the promise for completion of function (async)
 */
export const getRecentDonations = async (id: string, page: number): Promise<any> => {
    return new Promise((resolve, reject) => {
        let userDonationsJson = {};
        let url = String.format(donationsUrl, id, ((page > 1 ? page * limit : 1) || 1));

        request(url, (error, response) => {
            if (!error && response) {
                userDonationsJson.countDonations = response.headers['x-total-records'] || 0;
                userDonationsJson.countPages = Math.ceil(userDonationsJson.countDonations / 100);
                try {
                    userDonationsJson.recentDonations = JSON.parse(response.body);
                } catch (e) {
                    return reject(e);
                }

                resolve(userDonationsJson);
            } else {
                console.log('Error parsing recentDonations URL');
                return reject('There was an error trying to make your request');
            }
        });
    });
};

/**
 * Gets the team infomation of a specific team from extra life
 * @param {*} id - the team ID
 * @return {Promise} result - the promise for completion of function (async)
 */

export const getTeamInfo = async (id, roster = true) => {
    return new Promise((resolve, reject) => {
        let url = String.format(teamProfileUrl, id);
        console.log(url);
        let teamInfoJson = {};

        request(url, (error, response) => {
            if (!error && response) {
                try {
                    teamInfoJson = JSON.parse(response.body);
                } catch (e) {
                    return reject(e);
                }
                teamInfoJson.avatarImageURL = 'http:' + teamInfoJson.avatarImageURL;
                teamInfoJson.teamURL = domain + 'index.cfm?fuseaction=donorDrive.team&teamID=' + id;
                if (roster) {
                    module.exports.getTeamRoster(id).then((data) => {
                        console.log(data);
                        teamInfoJson.members = data.recentMembers.map((u) => {
                            u.URL = String.format(domain + 'index.cfm?fuseaction=donorDrive.participant&participantID={0}', u.participantID);
                            return u;
                        });

                        resolve(teamInfoJson);
                    }).catch((reason) => {
                        return reject(reason);
                    });
                } else {
                    resolve(teamInfoJson);
                }
            } else {
                console.log('Error obtaining team info');
                return reject('There was an error trying to make your request');
            }
        });
    });
};

/**
 * Gets the donations made to a specific team
 * @param {String} id - the team ID
 * @param {Number} page - the page number to return
 * @return {Promise} result - the promise for completion of function (async)
 */
export const getTeamDonations = async (id: string, page: number): Promise<any> => {
    return new Promise((resolve, reject) => {
        let teamDonationsJson = {};
        let url = String.format(teamDonationsUrl, id, ((page > 1 ? page * limit : 1) || 1));

        request(url, function (error, response) {
            if (!error && response) {
                teamDonationsJson.countDonations = response.headers['num-records'] || 0;
                teamDonationsJson.countPages = Math.ceil(teamDonationsJson.countDonations / 100);
                try {
                    teamDonationsJson.recentDonations = JSON.parse(response.body);
                } catch (e) {
                    return reject(e);
                }

                resolve(teamDonationsJson);
            } else {
                console.log('Error parsing teamDonations URL');
                return reject('There was an error trying to make your request');
            }
        });
    });
};

/**
 * Gets the team roster of a specific extra life team
 * @param id - the team ID
 * @param page - the page number to return
 * @return result - the promise for completion of function (async)
 */
export const getTeamRoster = async (id: string, page: number): Promise<any> => {
    return new Promise((resolve, reject) => {
        let teamRosterJson = {};
        let url = String.format(teamRosterUrl, id, ((page > 1 ? page * limit : 1) || 1));

        request(url, (error, response) => {
            if (!error && response) {
                teamRosterJson.countMembers = response.headers['num-records'] || 0;
                teamRosterJson.countPages = Math.ceil(teamRosterJson.countMembers / 100);
                try {
                    teamRosterJson.recentMembers = JSON.parse(response.body);
                } catch (e) {
                    return reject(e);
                }

                for (let i = 0; i < teamRosterJson.recentMembers.length; i++) {
                    teamRosterJson.recentMembers[i].avatarImageURL = 'https:' + teamRosterJson.recentMembers[i].avatarImageURL;
                    teamRosterJson.recentMembers[i].profileURL = domain + 'index.cfm?fuseaction=donorDrive.participants&participantID=' + teamRosterJson.recentMembers[i].participantID;
                }

                resolve(teamRosterJson);
            } else {
                console.log('Error parsing teamRoster URL');
                return reject('There was an error trying to make your request');
            }
        });
    });
};

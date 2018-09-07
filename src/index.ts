import * as request from 'request';

import { apiPaths } from './helpers/api-paths';
import { IDonationsList, IExtraLifeTeam, IExtraLifeUser, IRosterList } from './helpers/interfaces';

export { IDonationsList, IExtraLifeTeam, IExtraLifeUser, IRosterList } from './helpers/interfaces';

/**
 * Gets the extra life info of a user
 * @param id - the user participant ID
 * @param team - whether to return team info or not
 * @return result - the promise for completion of function (async)
 */
export const getUserInfo = async (id: string | number): Promise<IExtraLifeUser | any> => {
    return new Promise((resolve, reject) => {
        const url = apiPaths.profileUrl(id as number);
        let userInfoJson: any = {};

        request(url, (error: any, response: any) => {
            if (!error && response) {
                try {
                    userInfoJson = JSON.parse(response.body);
                    userInfoJson.avatarImageURL = 'https:' + userInfoJson.avatarImageURL;
                    userInfoJson.donateURL = `https://www.extra-life.org/index.cfm?fuseaction=donate.participant&participantID=${id}`;

                    if (userInfoJson.teamID) {
                        getTeamInfo(userInfoJson.teamID, false)
                            .then((data: any) => {
                                userInfoJson.teamURL = data.teamURL;
                                resolve(userInfoJson as IExtraLifeUser);
                            }).catch((reason) => {
                                reject(reason);
                            });
                    } else {
                        resolve(userInfoJson as IExtraLifeUser);
                    }
                } catch (e) {
                    reject(e);
                }
            } else {
                console.log('Error parsing userInfo URL');
                reject('There was an error trying to make your request');
            }
        });
    });
};

/**
 * Gets a list of a user's donations
 * @param id - the user participant ID
 * @param limit - limit of amount results shown at once.  defaults to 100
 * @param page - the page number to return
 * @return result - the promise for completion of function (async)
 */
export const getUserDonations = async (id: string | number, limit: number = 0, page: number = 1): Promise<IDonationsList | any> => {
    return new Promise((resolve, reject) => {
        const url = apiPaths.userDonationUrl(id, limit, page);
        const userDonationsJson: any = {};

        request(url, (error, response) => {
            if (!error && response) {
                try {
                    userDonationsJson.countDonations = response.headers['x-total-records'] || 0;
                    userDonationsJson.countPages = Math.ceil(userDonationsJson.countDonations / 100);
                    userDonationsJson.donations = JSON.parse(response.body);
                    resolve(userDonationsJson as IDonationsList);
                } catch (e) {
                    reject(e);
                }
            } else {
                console.log('Error parsing userDonations URL');
                reject('There was an error trying to make your request');
            }
        });
    });
};

/**
 * Gets the team infomation of a specific team from extra life
 * @param id - the team ID
 * @param fetchRoster - whether or not to fetch team roster
 * @return result - the promise for completion of function (async)
 */

export const getTeamInfo = async (id: string | number, fetchRoster = true): Promise<IExtraLifeTeam | any> => {
    return new Promise((resolve, reject) => {
        const url = apiPaths.teamProfileUrl(id);
        let teamInfoJson: any = {};

        request(url, (error, response) => {
            if (!error && response) {
                try {
                    teamInfoJson = JSON.parse(response.body);
                } catch (e) {
                    reject(e);
                }
                teamInfoJson.avatarImageURL = 'http:' + teamInfoJson.avatarImageURL;
                teamInfoJson.teamURL = `https://www.extra-life.org/index.cfm?fuseaction=donorDrive.team&teamID=${id}`;
                if (fetchRoster) {
                    getTeamRoster(id)
                        .then((data) => {
                            console.log(data);
                            teamInfoJson.members = data.members.map((u: any) => {
                                u.URL = `https://www.extra-life.org/index.cfm?fuseaction=donorDrive.participant&participantID=${u.participantID}`;
                                return u;
                            });

                            resolve(teamInfoJson as IExtraLifeTeam);
                        }).catch((reason) => {
                            reject(reason);
                        });
                } else {
                    resolve(teamInfoJson as IExtraLifeTeam);
                }
            } else {
                console.log('Error obtaining team info');
                reject('There was an error trying to make your request');
            }
        });
    });
};

/**
 * Gets the donations made to a specific team
 * @param id - the team ID
 * @param limit - limit of amount results shown at once.  defaults to 100
 * @param page - the page number to return.  defaults to 1
 * @return result - the promise for completion of function (async)
 */
export const getTeamDonations = async (id: string | number, limit: number = 100, page: number = 1): Promise<IDonationsList | any> => {
    return new Promise((resolve, reject) => {
        const teamDonationsJson: any = {};
        const url = apiPaths.teamDonationsUrl(id, limit, page);

        request(url, (error, response) => {
            if (!error && response) {
                try {
                    teamDonationsJson.countDonations = response.headers['num-records'] || 0;
                    teamDonationsJson.countPages = Math.ceil(teamDonationsJson.countDonations / 100);
                    teamDonationsJson.donations = JSON.parse(response.body);
                } catch (e) {
                    reject(e);
                }

                resolve(teamDonationsJson as IDonationsList);
            } else {
                console.log('Error parsing teamDonations URL');
                reject('There was an error trying to make your request');
            }
        });
    });
};

/**
 * Gets the team roster of a specific extra life team
 * @param id - the team ID
 * @param limit - limit of amount results shown at once.  defaults to 100
 * @param page - the page number to return.  defaults to 1
 * @return result - the promise for completion of function (async)
 */
export const getTeamRoster = async (id: string | number): Promise<IRosterList | any> => {
    return new Promise((resolve, reject) => {
        const teamRosterJson: any = {};
        const url = apiPaths.teamRosterUrl(id);

        request(url, (error, response) => {
            if (!error && response) {
                try {
                    teamRosterJson.countMembers = response.headers['num-records'] || 0;
                    teamRosterJson.countPages = Math.ceil(teamRosterJson.countMembers / 100);
                    teamRosterJson.members = JSON.parse(response.body);
                } catch (e) {
                    reject(e);
                }

                teamRosterJson.members.forEach((member: any) => {
                    member.avatarImageURL = 'https:' + member.avatarImageURL;
                    member.profileURL = `https://www.extra-life.org/index.cfm?fuseaction=donorDrive.participants&participantID=${member.participantID}`;
                });

                resolve(teamRosterJson as IRosterList);
            } else {
                console.log('Error parsing teamRoster URL');
                reject('There was an error trying to make your request');
            }
        });
    });
};

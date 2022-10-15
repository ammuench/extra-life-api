import fetch from 'node-fetch';

import { apiPaths } from './helpers/api-paths';
import { IBadgesList, IDonationsList, IExtraLifeTeam, IExtraLifeUser, IIncentivesList, IMilestonesList, IRosterList } from './helpers/interfaces';

export { IDonationsList, IExtraLifeTeam, IExtraLifeUser, IRosterList } from './helpers/interfaces';

/**
 * Gets the extra life info of a user
 * @param id - the user participant ID
 * @param cacheTag - an optional cache identifier to fail if not changed
 * @return result - the promise for completion of function (async)
 */
export const getUserInfo = async (id: string | number, cacheTag: string = ''): Promise<IExtraLifeUser> => {
    return new Promise<IExtraLifeUser>((resolve, reject) => {
        const url = apiPaths.profileUrl(id as number);
        let userInfoJson: any = {};

        fetch(url, {
            headers: {
                'If-None-Match': `"${cacheTag}"`,
            },
            redirect: 'error',
        }).then(async (res) => {
            // Reject calls on non-ok messages (like 304, cache hit)
            if (!res.ok) {
                return reject(res.statusText);
            }

            try {
                userInfoJson = await res.json();
                // Removing the "weak" flag and quotation marks so the identifier is clear
                userInfoJson.cacheTag = res.headers.get('etag').replace('W/"', '').replace('"', '');
                userInfoJson.lastModifiedUTC = (new Date(res.headers.get('last-modified'))).toISOString();

                return resolve(userInfoJson);
            } catch (e) {
                reject(e);
            }
        })
        .catch(() => {
            console.log('Error parsing userInfo URL');
            reject('There was an error trying to make your request');
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
export const getUserDonations = async (id: string | number, limit: number = 100, page: number = 1): Promise<IDonationsList> => {
    return new Promise<IDonationsList>((resolve, reject) => {
        const url = apiPaths.userDonationUrl(id, limit, page);
        const userDonationsJson: any = {};

        fetch(url)
            .then(async (res) => {
                try {
                    userDonationsJson.countDonations = parseInt(res.headers.get('num-records'), 10) || 0;
                    userDonationsJson.countPages = Math.ceil(userDonationsJson.countDonations / limit);
                    userDonationsJson.donations = await res.json();
                    resolve(userDonationsJson);
                } catch (e) {
                    reject(e);
                }
            })
            .catch(() => {
                console.log('Error parsing userDonations URL');
                reject('There was an error trying to make your request');
            });
    });
};

/**
 * Gets a list of a user's milestones
 * @param id - the user participant ID
 * @param limit - limit of amount results shown at once.  defaults to 100
 * @param page - the page number to return
 * @return result - the promise for completion of function (async)
 */
export const getUserMilestones = async (id: string | number, limit: number = 100, page: number = 1): Promise<IMilestonesList> => {
    return new Promise<IMilestonesList>((resolve, reject) => {
        const url = apiPaths.userMilestonesUrl(id, limit, page);
        const userMilestonesJson: any = {};

        fetch(url)
            .then(async (res) => {
                try {
                    userMilestonesJson.countMilestones = parseInt(res.headers.get('num-records'), 10) || 0;
                    userMilestonesJson.countPages = Math.ceil(userMilestonesJson.countMilestones / limit);
                    userMilestonesJson.milestones = await res.json();
                    resolve(userMilestonesJson);
                } catch (e) {
                    reject(e);
                }
            })
            .catch(() => {
                console.log('Error parsing userMilestones URL');
                reject('There was an error trying to make your request');
            });
        });
    };

/**
 * Gets a list of a user's incentives
 * @param id - the user participant ID
 * @param limit - limit of amount results shown at once.  defaults to 100
 * @param page - the page number to return
 * @return result - the promise for completion of function (async)
 */
export const getUserIncentives = async (id: string | number, limit: number = 100, page: number = 1): Promise<IIncentivesList> => {
    return new Promise<IIncentivesList>((resolve, reject) => {
        const url = apiPaths.userIncentivesUrl(id, limit, page);
        const userIncentivesJson: any = {};

        fetch(url)
            .then(async (res) => {
                try {
                    userIncentivesJson.countIncentives = parseInt(res.headers.get('num-records'), 10) || 0;
                    userIncentivesJson.countPages = Math.ceil(userIncentivesJson.countIncentives / limit);
                    userIncentivesJson.incentives = await res.json();
                    resolve(userIncentivesJson);
                } catch (e) {
                    reject(e);
                }
            })
            .catch(() => {
                console.log('Error parsing userIncentives URL');
                reject('There was an error trying to make your request');
            });
    });
};

/**
 * Gets a list of a user's badges
 * @param id - the user participant ID
 * @param limit - limit of amount results shown at once.  defaults to 100
 * @param page - the page number to return
 * @return result - the promise for completion of function (async)
 */
export const getUserBadges = async (id: string | number, limit: number = 100, page: number = 1): Promise<IBadgesList> => {
    return new Promise<IBadgesList>((resolve, reject) => {
        const url = apiPaths.userBadgesUrl(id, limit, page);
        const userBadgesJson: any = {};

        fetch(url)
            .then(async (res) => {
                try {
                    userBadgesJson.countBadges = parseInt(res.headers.get('num-records'), 10) || 0;
                    userBadgesJson.countPages = Math.ceil(userBadgesJson.countBadges / limit);
                    userBadgesJson.badges = await res.json();
                    resolve(userBadgesJson);
                } catch (e) {
                    reject(e);
                }
            })
            .catch(() => {
                console.log('Error parsing userBadges URL');
                reject('There was an error trying to make your request');
            });
    });
};

/**
 * Gets the team infomation of a specific team from extra life
 * @param id - the team ID
 * @param [fetchRoster=true] - whether or not to fetch team roster (default=true)
 * @return result - the promise for completion of function (async)
 */

export const getTeamInfo = async (id: string | number, fetchRoster = true): Promise<IExtraLifeTeam> => {
    return new Promise<IExtraLifeTeam>((resolve, reject) => {
        const url = apiPaths.teamProfileUrl(id);
        let teamInfoJson: any = {};

        fetch(url)
            .then(async (res) => {
                try {
                    teamInfoJson = await res.json();
                } catch (e) {
                    reject(e);
                }
                teamInfoJson.avatarImageURL = 'http:' + teamInfoJson.avatarImageURL;
                if (fetchRoster) {
                    getTeamRoster(id)
                        .then((rosterData) => {
                            teamInfoJson.members = rosterData.members.map((u: any) => {
                                u.URL = `https://www.extra-life.org/index.cfm?fuseaction=donorDrive.participant&participantID=${u.participantID}`;
                                return u;
                            });

                            resolve(teamInfoJson);
                        }).catch((reason) => {
                            reject(reason);
                        });
                } else {
                    resolve(teamInfoJson);
                }
            })
            .catch(() => {
                console.log('Error obtaining team info');
                reject('There was an error trying to make your request');
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
export const getTeamDonations = async (id: string | number, limit: number = 100, page: number = 1): Promise<IDonationsList> => {
    return new Promise<IDonationsList>((resolve, reject) => {
        const teamDonationsJson: any = {};
        const url = apiPaths.teamDonationsUrl(id, limit, page);

        fetch(url)
            .then(async (res) => {
                try {
                    teamDonationsJson.countDonations = parseInt(res.headers.get('num-records'), 10) || 0;
                    teamDonationsJson.countPages = Math.ceil(teamDonationsJson.countDonations / limit);
                    teamDonationsJson.donations = await res.json();
                } catch (e) {
                    reject(e);
                }

                resolve(teamDonationsJson);
            })
            .catch(() => {
                console.log('Error parsing teamDonations URL');
                reject('There was an error trying to make your request');
            });
    });
};

/**
 * Gets the team roster of a specific extra life team.  Maxes at 100 for any call.  Pages are groups of 100
 * @param id - the team ID
 * @param page - the page number to return.  returns page 1 by default
 * @return result - the promise for completion of function (async)
 */
export const getTeamRoster = async (id: string | number, page?: number): Promise<IRosterList> => {
    return new Promise<IRosterList>((resolve, reject) => {
        const teamRosterJson: any = {};
        const offsetCalc = (page && page !== 1) ? ((page - 1) * 100) : null;
        const url = apiPaths.teamRosterUrl(id, offsetCalc);

        fetch(url)
            .then(async (res) => {
                try {
                    teamRosterJson.countMembers = parseInt(res.headers.get('num-records'), 10) || 0;
                    teamRosterJson.countPages = Math.ceil(teamRosterJson.countMembers / 100);
                    try {
                        teamRosterJson.members = await res.json();
                    } catch (e) {
                        teamRosterJson.members = [];
                    }
                } catch (e) {
                    reject(e);
                }

                if (!teamRosterJson.members) {
                    teamRosterJson.members = [];
                }

                teamRosterJson.members.forEach((member: any) => {
                    member.avatarImageURL = 'https:' + member.avatarImageURL;
                });

                resolve(teamRosterJson);
            })
            .catch(() => {
                console.log('Error parsing teamRoster URL');
                reject('There was an error trying to make your request');
            });
    });
};

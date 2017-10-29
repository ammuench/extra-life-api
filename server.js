/**
 * extra-life-api
 * A node-based API module to get extended Extra Life info for Users and Teams!
 * @author Alex Muench (https://github.com/ammuench)
 */

var request = require('request');

const extraLifeBaseUrl = 'https://www.extra-life.org/index.cfm?fuseaction=';
const extraLifeParticipantUrl = 'donordrive.participant&participantID=';
const extraLifeParticipantDonationsUrl = 'donorDrive.participantDonations&participantID=';
const extraLifeTeamUrl = 'donorDrive.team&teamID=';
const extraLifeTeamRoosterUrl = 'donorDrive.teamParticipants&teamID=';
const jsonFormatUrl = '&format=json';
const errorMessage = 'There was an error trying to make your request';

const requestAsync = (url) => {
  return new Promise((resolve, reject) => {
    request(url, (err, res, body) => {
      if (err) { return reject(err); }
      try {
        return resolve(JSON.parse(body));
      } catch (e) {
        return reject(e);
      }
    });
  });
}

const compare = (a,b) => {
  return new Date(b.createdOn) - new Date(a.createdOn);
}

module.exports = {
  getUserInfo: async (id) => {
    return new Promise(resolve => {
      var profileId = id;

      //generate URLs from id
      var profileUrl = extraLifeBaseUrl + extraLifeParticipantUrl + profileId + jsonFormatUrl;

      //declare object for return
      var userInfoJson = {};

      request(profileUrl, (error, response) => {
        if (!error) {
          try {
            userInfoJson = JSON.parse(response.body);
          } catch (e) {
            resolve({status: 500, message: errorMessage});
          }

          userInfoJson.avatarImageURL = 'https:' + userInfoJson.avatarImageURL;
          userInfoJson.donateURL = extraLifeBaseUrl + extraLifeParticipantUrl + userInfoJson.participantID;
          userInfoJson.teamURL = extraLifeBaseUrl + extraLifeTeamUrl + userInfoJson.teamID;

          resolve(userInfoJson);
        } else {
          resolve({status: 500, message: errorMessage});
        }
      });
    });
  },

  getRecentDonations: async (id) => {
    return new Promise(resolve => {
      var userDonationsJson = {recentDonations: []};
      var donationsId = id;
      var donationsUrl = extraLifeBaseUrl + extraLifeParticipantDonationsUrl + donationsId + jsonFormatUrl;

      request(donationsUrl, (error, response) => {
        if (!error) {
          try {
            userDonationsJson = JSON.parse(response.body);
          } catch (e) {
            resolve({status: 500, message: errorMessage});
          }

          resolve(userDonationsJson);
        } else {
          resolve({status: 500, message: errorMessage});
        }
      });
    });
  },

  getTeamInfo: async (id) => {
    return new Promise(resolve => {
      var teamInfoId = id;
      var teamJsonURL = extraLifeBaseUrl + extraLifeTeamUrl + teamInfoId + jsonFormatUrl;
      var teamRosterUrl = extraLifeBaseUrl + extraLifeTeamRoosterUrl + teamInfoId + jsonFormatUrl
      var teamInfoJson = {};

      request(teamJsonURL, (error, response) => {
        if (error) {
          resolve({status: 500, message: errorMessage});
        }
        try {
          teamInfoJson = JSON.parse(response.body);
        } catch (e) {
          resolve({status: 500, message: errorMessage});
        }
        teamInfoJson.avatarImageURL = 'https:' + teamInfoJson.avatarImageURL;
        teamInfoJson.teamURL = extraLifeBaseUrl + extraLifeTeamUrl + teamInfoJson.teamID;

        request(teamRosterUrl, (error, response) => {
          if (error) {
            resolve({status: 500, message: errorMessage});
          }

          try {
            teamInfoJson.members = JSON.parse(response.body).map((u) => {
              u.URL = extraLifeBaseUrl + extraLifeParticipantUrl + u.participantID;
              return u;
            });
            resolve(teamInfoJson);
          } catch (e) {
            resolve({status: 500, message: errorMessage});
          }
        });
      })
    });
  },

  getTeamDonations: async (id) => {
    return new Promise(resolve => {
      var teamRosterUrl = extraLifeBaseUrl + extraLifeTeamRoosterUrl + id + jsonFormatUrl;
      request(teamRosterUrl, function (error, response) {
        if (error) {
          resolve({status: 500, message: errorMessage});
        }
        try {
          var result = JSON.parse(response.body).map((u) => extraLifeBaseUrl + extraLifeParticipantDonationsUrl + u.participantID + jsonFormatUrl);

          Promise.all(result.map(requestAsync)).then((allData) => {
            var mergedDonations = [].concat.apply([], allData);
            resolve(mergedDonations.sort(compare));
          });
        } catch (e) {
          resolve({status: 500, message: errorMessage});
        }
      });
    });
  }
}

/**
 * extra-life-api
 * A node-based API module to get extended Extra Life info for Users and Teams!
 * @author Alex Muench (https://github.com/ammuench)
 * @version 1.0.0
 */

var request = require('request');

var extraLifeBaseUrl = 'https://www.extra-life.org/index.cfm?fuseaction=';
var extraLifeParticipantUrl = 'donordrive.participant&participantID=';
var jsonFormatUrl = '&format=json';

module.exports = {
  getUserInfo: function (id, callback) {
    var profileId = id;

    //generate URLs from id
    var profileUrl = extraLifeBaseUrl + extraLifeParticipantUrl + profileId + jsonFormatUrl;

    //declare object for return
    var userInfoJson = {};

    request(profileUrl, function (error, response) {
      if (!error) {
        try {
          userInfoJson = JSON.parse(response.body);
        } catch (e) {
          callback({ status: 500, message: "There was an error trying to make your request" });
        }

        userInfoJson.avatarImageURL = 'https:' + userInfoJson.avatarImageURL;
        userInfoJson.donateURL = extraLifeBaseUrl + extraLifeParticipantUrl + userInfoJson.participantID

        callback(userInfoJson);
      } else {
        callback({ status: 500, message: "There was an error trying to make your request" });
      }
    });
  },

  getRecentDonations: function (id, callback) {
    var userDonationsJson = { recentDonations: [] };
    var donationsId = id;
    var donationsUrl = extraLifeBaseUrl +'donorDrive.participantDonations&participantID=' + donationsId + jsonFormatUrl;

    request(donationsUrl, function (error, response) {
      if (!error) {
        try {
          userDonationsJson = JSON.parse(response.body);
        } catch (e) {
          callback({ status: 500, message: "There was an error trying to make your request" });
        }

        callback(userDonationsJson);
      } else {
        callback({ status: 500, message: "There was an error trying to make your request" });
      }
    });
  },

  getTeamInfo: function (id, callback) {
    var teamInfoId = id;
    var teamJsonURL = extraLifeBaseUrl + 'donorDrive.team&teamID=' + teamInfoId + jsonFormatUrl;
    var teamRosterUrl = extraLifeBaseUrl + 'donorDrive.teamParticipants&teamID=' + teamInfoId + jsonFormatUrl
    var teamInfoJson = {};

    request(teamJsonURL, function (error, response) {
      if(error) {
        callback({ status: 500, message: "There was an error trying to make your request" });
      }
      try {
        teamInfoJson = JSON.parse(response.body);
      } catch (e) {
        callback({ status: 500, message: "There was an error trying to make your request" });
      }
      teamInfoJson.avatarImageURL = 'https:' + teamInfoJson.avatarImageURL;

      request(teamRosterUrl, function (error, response) {
        if(error) {
          callback({ status: 500, message: "There was an error trying to make your request" });
        }

        try {
          teamInfoJson.members = JSON.parse(response.body);
          callback(teamInfoJson);
        } catch (e) {
          callback({ status: 500, message: "There was an error trying to make your request" });
        }
      });
    })
  }

  // getTeamDonations: function (id, callback) {
  // 	var teamId = id;

  // 	var teamRosterURL = 'http://www.extra-life.org/index.cfm?fuseaction=donorDrive.teamParticipants&teamID=' + teamId + '&format=json';

  // 	var donations = [];

  // 	request(teamRosterURL, function (error, response) {
  // 		var rosterList = JSON.parse(response.body);
  // 		for (var i = 0, rosterLen = rosterList.length; i < rosterLen; i++) {
  // 			var userName = rosterList[i].displayName;
  // 			var donationUrl = 'http://www.extra-life.org/index.cfm?fuseaction=donorDrive.participantDonations&participantID=' + rosterList[i].participantID + '&format=json';

  // 			console.log(i, rosterList.length);

  // 			request(donationUrl, function (error, response) {
  // 				var userDonations = JSON.parse(response.body);
  // 				// var j = 0, donateLength = userDonations.length;
  // 				var donationsCount = 0;
  // 				for (var j = 0, len = userDonations.length; j < len; j++) {
  // 					userDonations[j].donatedTo = userName;
  // 					donations.push(userDonations[j]);

  // 					donationsCount = donations.length;

  // 					//Bit of a janky fix, but since we can have a TON of calls running async here,
  // 					//we check to see if the donations length has checked every 50ms.  Once they
  // 					//have shown to be equal, we send the callback data
  // 					timeout = setTimeout(function () {
  // 						if (donationsCount === donations.length) {
  // 							console.log('they are equal')
  // 							var sortByDate = function (a, b) {
  // 								if (a.createdOn < b.createdOn) {
  // 									return 1
  // 								}
  // 								if (a.createdOn > b.createdOn) {
  // 									return -1
  // 								}
  // 								return 0;
  // 							}
  // 							clearTimeout
  // 							return callback(donations.sort(sortByDate));

  // 						}else{
  // 							console.log('notequal');
  // 						}
  // 					}, 500)
  // 				}
  // 			});

  // 		}


  // 	})
  // }
}

import { getTeamInfo, getTeamDonations, getUserDonations, getUserInfo, getTeamRoster } from './index';
// import { IDonationsList } from './index';

// getUserDonations(311424)
//     .then((data) => {
//         console.log(data);
//     })
//     .catch((err) => {
//         console.log(err);
//     })

getTeamRoster(44504, 1)
    .then((data) => {
        console.log(data.members.length);
    })
    .catch((e) => {
        console.log(e);
    });

// getTeamDonations(38961, 50)
//     .then((data) => {
//         console.log(data);
//         // console.log(data.recentDonations.length);
//     })
//     .catch((e) => {
//         console.log(e);
//     });

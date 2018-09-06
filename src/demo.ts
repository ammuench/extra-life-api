import { getTeamInfo, getTeamDonations } from './index';

// getTeamInfo(39065)
//     .then((data) => {
//         console.log(data);
//     })
//     .catch((e) => {
//         console.log(e);
//     });

getTeamDonations(39065, 50)
    .then((data) => {
        console.log(data);
        // console.log(data.recentDonations.length);
    })
    .catch((e) => {
        console.log(e);
    });

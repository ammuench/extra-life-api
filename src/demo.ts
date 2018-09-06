import { getTeamInfo, getTeamDonations } from './index';
import * as elAPI from './index';


// elAPI.getUserDonations(318890, 100)
//     .then((data) => {
//         console.log(data);
//     })

getTeamDonations(38961, 5)
    .then((data) => {
        console.log(data);
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

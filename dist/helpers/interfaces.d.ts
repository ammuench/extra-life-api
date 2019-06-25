export interface IExtraLifeUser {
    avatarImageURL: string;
    createdDateUTC: string;
    displayName: string;
    links: {
        donate: string;
        page: string;
        stream?: string;
    };
    eventID: number;
    eventName: string;
    fundraisingGoal: number;
    isTeamCaptain?: boolean;
    numDonations: number;
    participantID: number;
    sumDonations: number;
    sumPledges: number;
    teamID?: number;
    teamName?: string;
    teamURL?: string;
}
export interface IExtraLifeDonation {
    participantID: number;
    amount: number;
    avatarImageURL: string;
    createdDateUTC: string;
    donationID: string;
    displayName?: string;
    message?: string;
    teamID?: number;
    donorID?: string;
}
export interface IExtraLifeTeam {
    fundraisingGoal: number;
    eventName: string;
    avatarImageURL: string;
    createdDateUTC: string;
    eventID: number;
    sumDonations: number;
    teamID: number;
    name: string;
    numDonations: number;
    links: {
        page: string;
    };
    members?: IExtraLifeUser[];
    isInviteOnly: boolean;
    captainDisplayName: string;
}
export interface IRosterList {
    countMembers: number;
    countPages: number;
    members: IExtraLifeUser[];
}
export interface IDonationsList {
    countDonations: number;
    countPages: number;
    donations: IExtraLifeDonation[];
}

export interface IExtraLifeUser {
    avatarImageURL: string;
    createdDateUTC: string;
    displayName: string;
    donateURL: string;
    eventID: number;
    eventName: string;
    fundraisingGoal: number;
    isTeamCaptain?: boolean;
    numDonations: number;
    participantID: number;
    sumDonations: number;
    teamID?: number;
    teamName?: string;
    teamURL?: string;
}
export interface IExtraLifeDonation {
    displayName: string;
    message: string;
    participantID: number;
    amount: number;
    donorID: string;
    avatarImageURL: string;
    createdDateUTC: string;
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
    teamURL: string;
    members?: IExtraLifeUser[];
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

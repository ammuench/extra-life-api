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
    numMilestones: number;
    numIncentives: number;
    isCustomAvatarImage: boolean;
    URL: string;
}
export interface IExtraLifeMilestone {
    fundraisingGoal: number;
    description: string;
    links?: {
        donate: string;
    };
    milestoneID: string;
    isActive: boolean;
}
export interface IExtraLifeIncentive {
    amount: number;
    description: string;
    incentiveImageURL: string;
    quantity: number;
    quantityClaimed: number;
    links?: {
        donate: string;
    };
    incentiveID: string;
    isActive: boolean;
}
export interface IExtraLifeBadge {
    description: string;
    isUnlocked: boolean;
    title: string;
    unlockedDateUTC: string;
    badgeImageURL: string;
    badgeCode: string;
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
    eventID: number;
    recipientName: string;
    links: {
        recipient: string;
    };
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
        stream?: string;
        page: string;
    };
    members?: IExtraLifeUser[];
    isInviteOnly: boolean;
    captainDisplayName: string;
    numParticipants: number;
    hasTeamOnlyDonations: boolean;
    streamIsLive: boolean;
    streamIsEnabled: boolean;
    streamingPlatform: string;
    sumPledges: number;
    streamingChannel: string;
    isCustomAvatarImage: boolean;
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

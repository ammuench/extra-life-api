import { IBadgesList, IDonationsList, IExtraLifeTeam, IExtraLifeUser, IIncentivesList, IMilestonesList, IRosterList } from './helpers/interfaces';
export { IDonationsList, IExtraLifeTeam, IExtraLifeUser, IRosterList } from './helpers/interfaces';
export declare const getUserInfo: (id: string | number) => Promise<IExtraLifeUser>;
export declare const getUserDonations: (id: string | number, limit?: number, page?: number) => Promise<IDonationsList>;
export declare const getUserMilestones: (id: string | number, limit?: number, page?: number) => Promise<IMilestonesList>;
export declare const getUserIncentives: (id: string | number, limit?: number, page?: number) => Promise<IIncentivesList>;
export declare const getUserBadges: (id: string | number, limit?: number, page?: number) => Promise<IBadgesList>;
export declare const getTeamInfo: (id: string | number, fetchRoster?: boolean) => Promise<IExtraLifeTeam>;
export declare const getTeamDonations: (id: string | number, limit?: number, page?: number) => Promise<IDonationsList>;
export declare const getTeamRoster: (id: string | number, page?: number) => Promise<IRosterList>;

import { IDonationsList, IExtraLifeTeam, IExtraLifeUser, IRosterList } from './helpers/interfaces';
export { IDonationsList, IExtraLifeTeam, IExtraLifeUser, IRosterList } from './helpers/interfaces';
export declare const getUserInfo: (id: string | number) => Promise<IExtraLifeUser>;
export declare const getUserDonations: (id: string | number, limit?: number, page?: number) => Promise<IDonationsList>;
export declare const getTeamInfo: (id: string | number, fetchRoster?: boolean) => Promise<IExtraLifeTeam>;
export declare const getTeamDonations: (id: string | number, limit?: number, page?: number) => Promise<IDonationsList>;
export declare const getTeamRoster: (id: string | number, page?: number) => Promise<IRosterList>;

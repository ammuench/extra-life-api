export declare const getUserInfo: (id: string | number) => Promise<any>;
export declare const getUserDonations: (id: string | number, limit?: number, page?: number) => Promise<any>;
export declare const getTeamInfo: (id: string | number, fetchRoster?: boolean) => Promise<any>;
export declare const getTeamDonations: (id: string | number, limit?: number, page?: number) => Promise<any>;
export declare const getTeamRoster: (id: string | number) => Promise<any>;

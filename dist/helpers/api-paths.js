"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiPaths = void 0;
const DOMAIN_STUB = 'https://www.extra-life.org/';
const pageOffset = (limit, page) => {
    if (page === 1) {
        return 1;
    }
    return limit * (page - 1);
};
exports.apiPaths = {
    userDonationUrl(id, limit = 100, page = 1) {
        if (!limit) {
            return `${DOMAIN_STUB}api/participants/${id}/donations`;
        }
        else {
            return `${DOMAIN_STUB}api/participants/${id}/donations?limit=${limit}&offset=${pageOffset(limit, page)}`;
        }
    },
    profileUrl(id) {
        return `${DOMAIN_STUB}api/participants/${id}`;
    },
    userIncentivesUrl(id, limit = 100, page = 1) {
        if (!limit) {
            return `${DOMAIN_STUB}api/participants/${id}/incentives`;
        }
        else {
            return `${DOMAIN_STUB}api/participants/${id}/incentives?limit=${limit}&offset=${pageOffset(limit, page)}`;
        }
    },
    userBadgesUrl(id, limit = 100, page = 1) {
        if (!limit) {
            return `${DOMAIN_STUB}api/participants/${id}/badges`;
        }
        else {
            return `${DOMAIN_STUB}api/participants/${id}/badges?limit=${limit}&offset=${pageOffset(limit, page)}`;
        }
    },
    userMilestonesUrl(id, limit = 100, page = 1) {
        if (!limit) {
            return `${DOMAIN_STUB}api/participants/${id}/milestones`;
        }
        else {
            return `${DOMAIN_STUB}api/participants/${id}/milestones?limit=${limit}&offset=${pageOffset(limit, page)}`;
        }
    },
    teamDonationsUrl(id, limit = 100, page = 1) {
        if (!limit) {
            return `${DOMAIN_STUB}api/teams/${id}/donations`;
        }
        else {
            return `${DOMAIN_STUB}api/teams/${id}/donations?limit=${limit}&offset=${pageOffset(limit, page)}`;
        }
    },
    teamProfileUrl(id) {
        return `${DOMAIN_STUB}api/teams/${id}`;
    },
    teamRosterUrl(id, offset) {
        return `${DOMAIN_STUB}api/teams/${id}/participants${offset ? `?offset=${offset + 1}` : ''}`;
    },
};

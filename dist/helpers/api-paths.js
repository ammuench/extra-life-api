"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DOMAIN_STUB = 'https://www.extra-life.org/';
const pageOffset = (limit, page) => {
    if (page === 1) {
        return 1;
    }
    return limit * page;
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

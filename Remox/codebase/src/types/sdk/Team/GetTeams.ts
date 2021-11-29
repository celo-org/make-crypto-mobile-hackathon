
export interface GetTeams {
    take?: number;
    skip?: number;
    sortBy?: string;
}

export interface GetTeamsResponse {
    teams: TeamInfo[];
    total: number
}

export interface TeamInfo {
    id: string,
    title: string,
    teamMembers: number, 
}
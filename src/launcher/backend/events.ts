//
// Event Interface for Backend Interaction
//


export interface BackendEvents
{
    // actions
    "mode": OfflineMode | OnlineMode;

    "login":    OnlineCredentials;
    "register": OnlineRegistrationCredentials;
    "accept":   OnlineTermsAndConditions;

    // backend signals
    "backend.ready": {};

    "backend.login.started": {};
    "backend.login.success": {};
    "backend.login.failure": {error: string};

    "backend.registration.started":    {};
    "backend.registration.conditions": {terms: string};
    "backend.registration.success":    {};
    "backend.registration.failure":    {error: string};
}


export interface OfflineMode
{
    mode: "offline";

    username: string;
}


export interface OnlineMode
{
    mode: "online";
    type: "uberserver";

    host: string;
    port: number;
}


export interface OnlineCredentials
{
    username: string;
    password: string;
}


export interface OnlineRegistrationCredentials
{
    username: string;
    password: string;

    email: string;
}


export interface OnlineTermsAndConditions
{
    verification?: string;
}


// this.server = new UberBackend("localhost", 8200);
// this.server = new UberBackend("78.46.100.157", 8200);

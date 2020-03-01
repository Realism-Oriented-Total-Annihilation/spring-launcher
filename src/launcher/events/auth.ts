//!
//! Authentication Interfaces
//!


export interface EvLoginCredentials
{
    user:     string;
    password: string;
}


export interface EvRegistrationCredentials
{
    user:     string;
    password: string;
    email:    string;
}


export interface EvLocalCredentials
{
    user: string;
}


export interface EvRegistrationCode
{
    code: string
}

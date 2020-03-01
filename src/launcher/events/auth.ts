//!
//! Authentication Interfaces
//!


export interface EvLoginCredentials
{
    user:     string;
    password: string;
}


export interface EvRegisterCredentials
{
    user:     string;
    password: string;
    email:    string;
}


export interface EvLocalCredentials
{
    user: string;
}

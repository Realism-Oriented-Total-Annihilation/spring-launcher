//!
//! Authentication Interfaces
//!


export interface LoginCredentials
{
    user:     string;
    password: string;
}


export interface RegisterCredentials
{
    user:     string;
    password: string;
    email:    string;
}


export interface LocalCredentials
{
    user: string;
}

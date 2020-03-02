//
// Server Protocol Interfaces
//


export interface PtclLoginOk
{
    username: string
}


export interface PtclLoginErr
{
    reason: string
}


export interface PtclRegistrationOk
{

}


export interface PtclRegistrationErr
{
    reason: string;
}


export interface PtclAgreement
{
    terms: string
}

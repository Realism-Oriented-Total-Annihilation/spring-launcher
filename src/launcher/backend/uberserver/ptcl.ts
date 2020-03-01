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


export interface PtctRegistrationOk
{

}


export interface PtctRegistrationErr
{
    reason: string;
}

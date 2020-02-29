//
// Command Types
//


export type MessageTypeKeys = keyof typeof MessageType;

export enum MessageType
{
    // Client
    BRIDGECLIENTFROM,
    CHANGEEMAIL,
    CHANGEEMAILREQUEST,
    CHANGEPASSWORD,
    CHANNELS,
    CONFIRMAGREEMENT,
    EXIT,
    FORCEALLYNO,
    FORCESPECTATORMODE,
    FORCETEAMCOLOR,
    FORCETEAMNO,
    GETCHANNELMESSAGES,
    HANDICAP,
    JOINBATTLEACCEPT,
    JOINBATTLEDENY,
    JOINFROM,
    LEAVE,
    LEAVEBATTLE,
    LEAVEFROM,
    LISTCOMPFLAGS,
    LOGIN,
    MYBATTLESTATUS,
    MYSTATUS,
    PING,
    PROMOTE,
    REGISTER,
    RENAMEACCOUNT,
    RESENDVERIFICATION,
    RESETPASSWORD,
    RESETPASSWORDREQUEST,
    SAY,
    SAYEX,
    SAYFROM,
    STLS,
    UNBRIDGECLIENTFROM,

    // Server
    ACCEPTED,
    ADDUSER,
    AGREEMENT,
    AGREEMENTEND,
    BATTLECLOSED,
    BATTLEOPENED,
    BRIDGEDCLIENTFROM,
    CHANGEEMAILACCEPTED,
    CHANGEEMAILDENIED,
    CHANGEEMAILREQUESTACCEPTED,
    CHANGEEMAILREQUESTDENIED,
    CHANNEL,
    CHANNELMESSAGE,
    CLIENTBATTLESTATUS,
    CLIENTIPPORT,
    CLIENTS,
    CLIENTSFROM,
    CLIENTSTATUS,
    COMPFLAGS,
    DENIED,
    ENDOFCHANNELS,
    FAILED,
    FORCEQUITBATTLE,
    HOSTPORT,
    IGNORELISTBEGIN,
    IGNORELISTEND,
    JOINBATTLEFAILED,
    JOINBATTLEREQUEST,
    JOINED,
    JOINEDBATTLE,
    JOINEDFROM,
    JOINFAILED,
    JSON,
    LEFT,
    LEFTBATTLE,
    LEFTFROM,
    LOGININFOEND,
    MOTD,
    OK,
    OPENBATTLEFAILED,
    PONG,
    REDIRECT,
    REGISTRATIONACCEPTED,
    REGISTRATIONDENIED,
    REMOVEUSER,
    REQUESTBATTLESTATUS,
    RESENDVERIFICATIONACCEPTED,
    RESENDVERIFICATIONDENIED,
    RESETPASSWORDACCEPTED,
    RESETPASSWORDDENIED,
    RESETPASSWORDREQUESTACCEPTED,
    RESETPASSWORDREQUESTDENIED,
    SAID,
    SAIDEX,
    SAIDFROM,
    SAIDPRIVATE,
    SAIDPRIVATEEX,
    SERVERMSG,
    SERVERMSGBOX,
    TASSERVER,
    UDPSOURCEPORT,
    UNBRIDGEDCLIENTFROM,

    // Both
    ADDBOT,
    ADDSTARTRECT,
    CHANNELTOPIC,
    DISABLEUNITS,
    ENABLEALLUNITS,
    ENABLEUNITS,
    IGNORE,
    IGNORELIST,
    JOIN,
    JOINBATTLE,
    KICKFROMBATTLE,
    OPENBATTLE,
    REMOVEBOT,
    REMOVESCRIPTTAGS,
    REMOVESTARTRECT,
    RING,
    SAYPRIVATE,
    SAYPRIVATEEX,
    SETSCRIPTTAGS,
    UNIGNORE,
    UPDATEBATTLEINFO,
    UPDATEBOT,
}


// export function from_string(cmd: string)
// {
//     switch (cmd)
//         {
//             case "ACCEPTED":                     return "ACCEPTED"; break;
//             case "ADDBOT":                       return "ADDBOT"; break;
//             case "ADDSTARTRECT":                 return "ADDSTARTRECT"; break;
//             case "ADDUSER":                      return "ADDUSER"; break;
//             case "AGREEMENT":                    return "AGREEMENT"; break;
//             case "AGREEMENTEND":                 return "AGREEMENTEND"; break;
//             case "BATTLECLOSED":                 return "BATTLECLOSED"; break;
//             case "BATTLEOPENED":                 return "BATTLEOPENED"; break;
//             case "BRIDGEDCLIENTFROM":            return "BRIDGEDCLIENTFROM"; break;
//             case "CHANGEEMAILACCEPTED":          return "CHANGEEMAILACCEPTED"; break;
//             case "CHANGEEMAILDENIED":            return "CHANGEEMAILDENIED"; break;
//             case "CHANGEEMAILREQUESTACCEPTED":   return "CHANGEEMAILREQUESTACCEPTED"; break;
//             case "CHANGEEMAILREQUESTDENIED":     return "CHANGEEMAILREQUESTDENIED"; break;
//             case "CHANNEL":                      return "CHANNEL"; break;
//             case "CHANNELMESSAGE":               return "CHANNELMESSAGE"; break;
//             case "CHANNELTOPIC":                 return "CHANNELTOPIC"; break;
//             case "CLIENTBATTLESTATUS":           return "CLIENTBATTLESTATUS"; break;
//             case "CLIENTIPPORT":                 return "CLIENTIPPORT"; break;
//             case "CLIENTS":                      return "CLIENTS"; break;
//             case "CLIENTSFROM":                  return "CLIENTSFROM"; break;
//             case "CLIENTSTATUS":                 return "CLIENTSTATUS"; break;
//             case "COMPFLAGS":                    return "COMPFLAGS"; break;
//             case "DENIED":                       return "DENIED"; break;
//             case "DISABLEUNITS":                 return "DISABLEUNITS"; break;
//             case "ENABLEALLUNITS":               return "ENABLEALLUNITS"; break;
//             case "ENABLEUNITS":                  return "ENABLEUNITS"; break;
//             case "ENDOFCHANNELS":                return "ENDOFCHANNELS"; break;
//             case "FAILED":                       return "FAILED"; break;
//             case "FORCEQUITBATTLE":              return "FORCEQUITBATTLE"; break;
//             case "HOSTPORT":                     return "HOSTPORT"; break;
//             case "IGNORE":                       return "IGNORE"; break;
//             case "IGNORELIST":                   return "IGNORELIST"; break;
//             case "IGNORELISTBEGIN":              return "IGNORELISTBEGIN"; break;
//             case "IGNORELISTEND":                return "IGNORELISTEND"; break;
//             case "JOIN":                         return "JOIN"; break;
//             case "JOINBATTLE":                   return "JOINBATTLE"; break;
//             case "JOINBATTLEFAILED":             return "JOINBATTLEFAILED"; break;
//             case "JOINBATTLEREQUEST":            return "JOINBATTLEREQUEST"; break;
//             case "JOINED":                       return "JOINED"; break;
//             case "JOINEDBATTLE":                 return "JOINEDBATTLE"; break;
//             case "JOINEDFROM":                   return "JOINEDFROM"; break;
//             case "JOINFAILED":                   return "JOINFAILED"; break;
//             case "JSON":                         return "JSON"; break;
//             case "KICKFROMBATTLE":               return "KICKFROMBATTLE"; break;
//             case "LEFT":                         return "LEFT"; break;
//             case "LEFTBATTLE":                   return "LEFTBATTLE"; break;
//             case "LEFTFROM":                     return "LEFTFROM"; break;
//             case "LOGININFOEND":                 return "LOGININFOEND"; break;
//             case "MOTD":                         return "MOTD"; break;
//             case "OK":                           return "OK"; break;
//             case "OPENBATTLE":                   return "OPENBATTLE"; break;
//             case "OPENBATTLEFAILED":             return "OPENBATTLEFAILED"; break;
//             case "PONG":                         return "PONG"; break;
//             case "REDIRECT":                     return "REDIRECT"; break;
//             case "REGISTRATIONACCEPTED":         return "REGISTRATIONACCEPTED"; break;
//             case "REGISTRATIONDENIED":           return "REGISTRATIONDENIED"; break;
//             case "REMOVEBOT":                    return "REMOVEBOT"; break;
//             case "REMOVESCRIPTTAGS":             return "REMOVESCRIPTTAGS"; break;
//             case "REMOVESTARTRECT":              return "REMOVESTARTRECT"; break;
//             case "REMOVEUSER":                   return "REMOVEUSER"; break;
//             case "REQUESTBATTLESTATUS":          return "REQUESTBATTLESTATUS"; break;
//             case "RESENDVERIFICATIONACCEPTED":   return "RESENDVERIFICATIONACCEPTED"; break;
//             case "RESENDVERIFICATIONDENIED":     return "RESENDVERIFICATIONDENIED"; break;
//             case "RESETPASSWORDACCEPTED":        return "RESETPASSWORDACCEPTED"; break;
//             case "RESETPASSWORDDENIED":          return "RESETPASSWORDDENIED"; break;
//             case "RESETPASSWORDREQUESTACCEPTED": return "RESETPASSWORDREQUESTACCEPTED"; break;
//             case "RESETPASSWORDREQUESTDENIED":   return "RESETPASSWORDREQUESTDENIED"; break;
//             case "RING":                         return "RING"; break;
//             case "SAID":                         return "SAID"; break;
//             case "SAIDEX":                       return "SAIDEX"; break;
//             case "SAIDFROM":                     return "SAIDFROM"; break;
//             case "SAIDPRIVATE":                  return "SAIDPRIVATE"; break;
//             case "SAIDPRIVATEEX":                return "SAIDPRIVATEEX"; break;
//             case "SAYPRIVATE":                   return "SAYPRIVATE"; break;
//             case "SAYPRIVATEEX":                 return "SAYPRIVATEEX"; break;
//             case "SERVERMSG":                    return "SERVERMSG"; break;
//             case "SERVERMSGBOX":                 return "SERVERMSGBOX"; break;
//             case "SETSCRIPTTAGS":                return "SETSCRIPTTAGS"; break;
//             case "TASSERVER":                    return "TASSERVER"; break;
//             case "UDPSOURCEPORT":                return "UDPSOURCEPORT"; break;
//             case "UNBRIDGEDCLIENTFROM":          return "UNBRIDGEDCLIENTFROM"; break;
//             case "UNIGNORE":                     return "UNIGNORE"; break;
//             case "UPDATEBATTLEINFO":             return "UPDATEBATTLEINFO"; break;
//             case "UPDATEBOT":                    return "UPDATEBOT"; break;

//             default:
//                 throw `Unknown command: ${cmd}`;
//         }
// }

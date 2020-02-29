//
// All Event Names in an Enumeration
//


export type EventKeys = keyof typeof Event;

export enum Event
{
    TAB_SELECTED,    // = "tab.selected",

    CHAT_SHOW,    // = "chat.show",
    CHAT_HIDE,    // = "chat.hide",

    MSG_SENT,        // = "msg.sent",
    MSG_RECEIVED,    // = "msg.recieved",

    SERVER_READY,     // = "server.ready",
    SERVER_CLOSED,    // = "server.closed",
    SERVER_FAILED,    // = "server.failed",

    REQUEST_LOGIN,       // = "request.login",
    REQUEST_REGISTER,    // = "request.register",
    REQUEST_OFFLINE,     // = "request.offline",

    RESPONSE_ACCEPTED,      // = "response.accepted",
    RESPONSE_REGISTERED,    // = "response.registered",
}

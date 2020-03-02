//
// All Event Names in an Enumeration
//


export type EventKeys = keyof typeof Event;

export enum Event
{
    TAB_SELECTED,

    CHAT_SHOW,
    CHAT_HIDE,

    MSG_SENT,
    MSG_RECEIVED,

    MODE_ONLINE,
    MODE_LOCAL,

    GAME_SELECTED,

    // Connection Events with the Server
    SERVER_READY,
    SERVER_CLOSED,
    SERVER_FAILED,

    // Events for Requests on the Server
    REQUEST_LOGIN,
    REQUEST_REGISTRATION,
    REQUEST_OFFLINE,
    REQUEST_AGREE_TERMS,

    // Events for Responses from the Server
    RESPONSE_LOGIN_OK,
    RESPONSE_LOGIN_ERROR,
    RESPONSE_LOGIN_AGREEMENT,
    RESPONSE_REGISTRATION_OK,
    RESPONSE_REGISTRATION_ERROR,
    RESPONSE_PONG,
}

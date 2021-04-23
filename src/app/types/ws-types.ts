// REMEMBER: Sync types below with Website project.
// -> in ws.service.ts
import { ChannelTypes, Lean, UserTypes, InviteTypes } from './entity-types';

/** WS Params are what is sent to the websocket. */
export interface WSEventParams {
  /** Add a friend, by username, by sending an outgoing request or accepting an incoming request. */
  'ADD_FRIEND': Params.AddFriend;
  /** Create a channel in a guild. */
  'CHANNEL_CREATE': Params.ChannelCreate;
  /** Delete a channel in a guild. */
  'CHANNEL_DELETE': Params.ChannelDelete;
  /** Create a guild. */
  'GUILD_CREATE': Params.GuildCreate;
  /** Delete a guild. */
  'GUILD_DELETE': Params.GuildDelete;
  /** Accept a guild invite. */
  'GUILD_MEMBER_ADD': Params.GuildMemberAdd;
  /** Remove a member from a guild. */
  'GUILD_MEMBER_DELETE': Params.GuildMemberDelete;
  /** Update a members roles or other properties on a member. */
  'GUILD_MEMBER_UPDATE': Params.GuildMemberUpdate;
  /** Create a role in a guild. */
  'GUILD_ROLE_CREATE': Params.GuildRoleCreate;
  /** Delete a role in a guild. */
  'GUILD_ROLE_DELETE': Params.GuildRoleDelete;
  /** Update a guild role permissions or other properties. */
  'GUILD_ROLE_UPDATE': Params.GuildRoleUpdate;
  /** Update the settings of a guild. */
  'GUILD_UPDATE': Params.GuildUpdate;
  /** Create an invite in a guild */
  'INVITE_CREATE': Params.InviteCreate;
  /** Delete an existing invite in a guild. */
  'INVITE_DELETE': Params.InviteDelete;
  /** Create a message in a text-based channel. */
  'MESSAGE_CREATE': Params.MessageCreate;
  /** Delete an existing message in a text-based channel. */
  'MESSAGE_DELETE': Params.MessageDelete;
  /** Update an existing message in a text-based channel. */
  'MESSAGE_UPDATE': Params.MessageUpdate;
  /** Bootstrap your websocket client to be able to use other websocket events.
   * - Associate ws client ID with user ID.
   * - Join user rooms.
   * - Set online status. */
  'READY': Params.Ready;
  /** Cancel a friend request, or remove an existing friend. */
  'REMOVE_FRIEND': Params.RemoveFriend;
  /** Indicate that you are typing in a text-based channel. */
  'TYPING_START': Params.TypingStart;
  /** Update user settings. */
  'USER_UPDATE': Params.UserUpdate;
  /** Manually disconnect from the websocket; logout. */
  'disconnect': any;
}
/** WS Args are what is received from the websocket. */
export interface WSEventArgs {
  /** Called after you sent an outgoing friend request, or of an incoming friend request. */
  'ADD_FRIEND': (args: Args.AddFriend) => any;
  /** Called when a guild channel is created. */
  'CHANNEL_CREATE': (args: Args.ChannelCreate) => any;
  /** Callled when a guild channel is deleted. */
  'CHANNEL_DELETE': (args: Args.ChannelDelete) => any;
  /** Called when a guild is deleted. */
  'GUILD_DELETE': (args: Args.GuildDelete) => any;
  /** Called when the client joins a guild. */
  'GUILD_JOIN': (args: Args.GuildJoin) => any;
  /** Called when the client leaves a guild. */
  'GUILD_LEAVE': (args: Args.GuildLeave) => any;
  /** Called when someone joins a guild by an invite, or a bot is added. */
  'GUILD_MEMBER_ADD': (args: Args.GuildMemberAdd) => any;
  /** Called when member roles are updated, or other properties. */
  'GUILD_MEMBER_UPDATE': (args: Args.GuildMemberUpdate) => any;
  /** Called when a guild role is created. */
  'GUILD_ROLE_CREATE': (args: Args.GuildRoleCreate) => any;
  /** Called when a guild role is deleted. */
  'GUILD_ROLE_DELETE': (args: Args.GuildRoleDelete) => any;
  /** Called when properties on a guild role are updated. */
  'GUILD_ROLE_UPDATE': (args: Args.GuildRoleUpdate) => any;
  /** Called when guild settings are updated. */
  'GUILD_UPDATE': (args: Args.GuildUpdate) => any;
  /** Called when a guild invite is created. */
  'INVITE_CREATE': (args: Args.InviteCreate) => any;
  /** Called when an existing guild invite is deleted. */
  'INVITE_DELETE': (args: Args.InviteDelete) => any;
  /** Called when a message is created in a text-based channel. */
  'MESSAGE_CREATE': (args: Args.MessageCreate) => any;
  /** Called when a message is deleted in a text-based channel. */
  'MESSAGE_DELETE': (args: Args.MessageDelete) => any;
  /** Called when an existing message is updated in a text-based channel. */
  'MESSAGE_UPDATE': (args: Args.MessageUpdate) => any;
  /** Called when a known user's presence status is updated. */
  'PRESENCE_UPDATE': (params: Args.PresenceUpdate) => any;
  /** Called when the websocket accepts that you are ready. */
  'READY': () => any;
  /** Called when you are removed as a friend, or you remove a friend request, or an existing friend. */
  'REMOVE_FRIEND': (args: Args.RemoveFriend) => any;
  /** Called when someone is typing in a text-based channel. */
  'TYPING_START': (args: Args.TypingStart) => any;
  /** Called the client user settings are updated. */
  'USER_UPDATE': (args: Args.UserUpdate) => any;
  /** Called when a websocket message is sent. */
  'message': (message: string) => any;
}

export namespace Params {
  export interface AddFriend {
    username: string;
  }
  export interface ChannelCreate {
    guildId: string;
    partialChannel: Partial.Channel;
  }
  export interface ChannelDelete {
    /** ID of the channel to delete. */
    channelId: string;
  }
  export interface GuildCreate {
    partialGuild: Partial.Guild;
  }
  export interface GuildDelete {
    guildId: string;
  }
  export interface GuildMemberAdd {
    inviteCode: string;
  }
  export interface GuildMemberDelete {
    guildId: string;
    userId: string;
  }
  export interface GuildMemberUpdate {
    guildId: string;
    partialMember: Partial.GuildMember;
    userId: string;
  }
  export interface GuildRoleCreate {
    guildId: string;
    partialRole: Partial.Role;
  }
  export interface GuildRoleDelete {
    roleId: string;
    guildId: string;
  }
  export interface GuildRoleUpdate {
    roleId: string;
    guildId: string;
    partialRole: Partial.Role;
  }
  export interface GuildUpdate {
    guildId: string;
    partialGuild: Partial.Guild;
  }
  export interface InviteCreate {
    guildId: string;
    options: InviteTypes.Options;
  }
  export interface InviteDelete {
    inviteCode: string;
  }
  export interface MessageCreate {
    channelId: string;
    partialMessage: Partial.Message;
  }
  export interface MessageDelete {
    messageId: string;
  }
  export interface MessageUpdate {
    messageId: string;
    partialMessage: Partial.Message;
    withEmbed: boolean;
  }
  export interface MessageCreate {
    partialMessage: Partial.Message;
  }
  export interface Ready {
    key: string;
  }
  export interface RemoveFriend {
    friendId: string;
  }
  export interface TypingStart {
    channelId: string;
  }
  export interface UserUpdate {
    partialUser: Partial.User;
    key: string;
  }
}

export namespace Args {
  export interface AddFriend {
    /** The recipient who received the friend request. */
    friend: Lean.User;
    /** User who sent or accepted the friend request. */
    sender: Lean.User;
    /** Only available if both users add each other as a friend.  */
    dmChannel?: ChannelTypes.DM;
  }
  /**  */
  export interface ChannelCreate {
    /** The full object fo the channel that was created. */
    channel: Lean.Channel;
  }
  export interface ChannelDelete {
    /** The ID of the channel that is deleted. */
    channelId: string;
  }
  export interface GuildJoin {
    /** The full object of the guild that was joined. */
    guild: Lean.Guild;
  }
  export interface GuildLeave {
    /** ID of the guild that was left. */
    guildId: string;
  }
  export interface GuildDelete {}
  /** Called when a member accepts an invite, or a bot was added to a guild. */
  export interface GuildMemberAdd {
    /** Full object of the member that was added to the guild. */
    member: Lean.GuildMember;
  }
  export interface GuildMemberDelete {
    userId: string;
  }
  export interface GuildMemberUpdate {
    /** Properties to update the guild member. */
    partialMember: Partial.GuildMember;
    /** User ID of the guild member. */
    userId: string;
  }
  export interface GuildRoleCreate {
    /** Full object of the role that was created. */
    role: Lean.Role;
  }
  export interface GuildRoleDelete {
    /** The ID of the role that was deleted. */
    roleId: string;
  }
  export interface GuildRoleUpdate {
    /** Properties to update the role. */
    partialRole: Partial.Role;
    /** The ID of the role that was updated. */
    roleId: string;
  }
  export interface GuildUpdate {
    /** Properties to update a guild. */
    partialGuild: Partial.Guild;
  }
  export interface InviteCreate {
    /** Full object of the invite. */
    invite: Lean.Invite;
  }
  /** Called when a guild invite is delted. */
  export interface InviteDelete {
    /** The ID or the code of the invite. */
    inviteCode: string;
  }
  export interface MessageCreate {
    /** Full object of the message that was created. */
    message: Lean.Message;
  }
  export interface MessageDelete {
    /** The ID of the message that was deleted. */
    messageId: string;
  }
  export interface MessageUpdate {
    /** Full object of the message that was updated. */
    message: Lean.Message;
  }
  export interface PresenceUpdate {
    userId: string;
    status: UserTypes.StatusType;
  }
  export interface Ready {}
  export interface RemoveFriend {
    friend: Lean.User;
    sender: Lean.User;
  }
  export interface TypingStart {
    userId: string;
  }
  export interface UserUpdate {
    partialUser: Partial.User;
  }
}

/** Partial classes involved in updating things.
 * Only specified properties will be updated. */
export namespace Partial {
  /** Properties to update bot applications. */
  export interface Application {
    description?: string;
    name?: string;
  }
  /** Properties to update channels. */
  export interface Channel {
    name?: string;
    type: ChannelTypes.Type;
    summary?: string;
  }
  /** Properties to update a class. */
  export interface Guild {
    name?: string;
    iconURL?: string;
  }
  /** Properties to update a guild member. */
  export interface GuildMember {
    
  }
  /** Properties to update a message. */
  export interface Message {
    content: string;
  }
  /** Properties to update a role. */
  export interface Role {
    name?: string;
    color?: string;
    hoisted?: boolean;
    mentionable?: boolean;
    permissions?: number;
    position?: number;
  }
  /** Properties to update a user. */
  export interface User {
    avatarURL?: string;
    username?: string;
    ignored?: {
      channelIds: string[];
      guildIds: string[];
      userIds: string[];
    }
  }
}

import { Schema, model, Document } from "mongoose";

export interface IVerbals {
  moderator: string;
  user: string;
  reasonText: string;
  reasonImage: string;
  casenumber: number;
  timestamp: string;
}

interface ISuggestions {
  msgID: string;
  suggestorID: string;
  suggestorTag: string;
  suggestion: string;
}

interface ITicket {
  member: string;
  channel: string;
}

interface ITag {
  name: string;
  response: string;
}
export interface IGuildSettings extends Document {
  guildID: string;
  disabledCommands: Array<string>;
  verbals: Array<IVerbals>;
  punishmentcases: number;
  suggestions: Array<ISuggestions>;
  sleep: Boolean;
  tickets: ITicket[];
  totalTickets: number;
  ticketRoles: string[];
  ticketSupportedRole: string | undefined;
  tags: ITag[];
}

const GuildSettingsScema = new Schema({
  guildID: { type: String, requried: true, index: true, unique: true },
  disabledCommands: { type: Array<string>(), default: new Array<String>() },
  verbals: { type: Array<IVerbals>(), default: new Array<IVerbals>() },
  punishmentcases: { type: Number, default: 1 },
  sleep: { type: Boolean, default: false },
  suggestions: { type: Array<ISuggestions>(), default: new Array<ISuggestions>() },
  tickets: { type: Array<ITicket>(), default: new Array<ITicket>() },
  totalTickets: { type: Number, default: 0 },
  ticketRoles: { type: Array<String>(), default: new Array<String>() },
  ticketSupportedRole: { type: String, default: undefined },
  tags: { type: Array<ITag>(), default: new Array<ITag>() },
});

export default model<IGuildSettings>("GuildSettings", GuildSettingsScema);

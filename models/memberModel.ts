// Importing mongoose library along with Document and Model types from it
import mongoose, { Document, Model } from "mongoose";

// Defining the structure of a TeamMember item using TypeScript interfaces
export interface ITeamMember {
  Name: string;
  MealOption: string;
}

// Merging ITeamMember interface with mongoose's Document interface to create
// a new interface that represents a TeamMember document in MongoDB
export interface ITeamMemberDocument extends ITeamMember, Document {
  _id: string;
  created_At: Date;
}

// Defining a mongoose schema for the TeamMember document, specifying the types
// and constraints
const teamMemberSchema = new mongoose.Schema<ITeamMemberDocument>(
  {
    _id: {
      type: String,
      default: () => new mongoose.Types.ObjectId().toHexString(),
    },
    Name: {
      type: String,
      required: true,
    },
    MealOption: {
      type: String,
      required: true,
    },
    created_At: {
      type: Date,
      default: Date.now,
    },
  },
  {
    // Automatically add 'createdAt' and 'updatedAt' fields to the document
    timestamps: false,
    versionKey: false,
    _id: false,
  }
);

// Creating a mongoose model for the TeamMember document
const TeamMember: Model<ITeamMemberDocument> =
  mongoose.models?.TeamMember || mongoose.model("TeamMember", teamMemberSchema);

export default TeamMember;

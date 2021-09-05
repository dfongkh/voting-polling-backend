const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CampaignSchema = new Schema({
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [
      {
        option: String,
        count: String,
      },
    ],
    required: true,
  },
  hkids: [
    {
      type: String,
      required: true,
    },
  ],
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
});

// Create collection and add schema
const Campaign = mongoose.model("Campaign", CampaignSchema);

module.exports = Campaign;

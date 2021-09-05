const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Pusher = require("pusher");

const Campaign = require("../models/Campaign");

const pusher = new Pusher({
  appId: "1234567",
  key: "ccccccccccc",
  secret: "ddddddddddd",
  cluster: "ap1",
  useTLS: true,
});

/**
 * @swagger
 * /campaign:
 *  get:
 *    description: Use to request all campaigns
 *    responses:
 *      '200':
 *        description: Successful response
 */
router.get("/", (req, res) => {
  Campaign.find().then((campaigns) =>
    res.json({
      status: 200,
      data: campaigns,
      success: true,
    })
  );
});

/**
 * @swagger
 * /campaign/:id:
 *  get:
 *    description: Use to request specific campaign
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: id of the campaign
 *        example: 613351f34a92921fd729b973
 *    responses:
 *      '200':
 *        description: Successful response
 *      '404':
 *        description: Not found
 */
router.get("/:id", (req, res) => {
  const { id } = req.params;
  Campaign.findById(id, (err, campaign) => {
    if (err) {
      return res.status(404).json({
        status: 404,
        message: "Campaign not found",
        success: false,
      });
    }
    const { _id, question, options, startDate, endDate } = campaign;
    // exclude HKID array for privacy
    const data = {
      _id: _id,
      question: question,
      options: options,
      startDate: startDate,
      endDate: endDate,
    };
    return res.json({
      status: 200,
      data: data,
      success: true,
    });
  });
});

/**
 * @swagger
 * /campaign:
 *  post:
 *    description: Use to create a new campaign
 *    responses:
 *      '200':
 *        description: Successful response
 */
router.post("/", (req, res) => {
  const { question, options, startDate, endDate } = req.body;
  const newCampaign = {
    question,
    options,
    startDate,
    endDate,
  };
  console.log(newCampaign);
  new Campaign(newCampaign).save().then((campaign) => {
    return res.json({
      status: 200,
      success: true,
      message: "Thank you for submitting",
    });
  });
});

/**
 * @swagger
 * /campaign/:id:
 *  put:
 *    description: Use to submit a new vote for a campaign
 *    responses:
 *      '200':
 *        description: Successful response
 */
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { optionId, hkid } = req.body;

  const campaign = await Campaign.findById(id);

  const currentDate = new Date();
  const currentTime = currentDate.getTime();
  const startTime = campaign.startDate.getTime();
  const endTime = campaign.endDate.getTime();
  if (currentTime < startTime) {
    console.log("Campaign has not started for voting yet");
    return res.status(409).json({
      status: 409,
      success: false,
      message: "Campaign has not started for voting yet",
    });
  }

  if (currentTime > endTime) {
    console.log("Campaign has ended for voting");
    return res.status(409).json({
      status: 409,
      success: false,
      message: "Campaign has ended",
    });
  }

  if (campaign.hkids.includes(hkid)) {
    console.log("HKID exists");
    return res.status(409).json({
      status: 409,
      success: false,
      message: "HKID Exists",
    });
  }

  campaign.options.find((x) => x.id === optionId).count++;
  campaign.hkids.push(hkid);

  campaign.save().then((vote) => {
    pusher.trigger("polling-voting", "vote", {
      options: vote.options,
    });

    return res.json({
      status: 200,
      success: true,
      message: "Thank you for voting",
      data: campaign,
    });
  });

  // pusher.trigger("my-channel", "my-event", {
  //   message: "hello world"
  // });
  // return res.json({
  //   success: true,
  //   message: "Thank you for voting",
  // });
});

module.exports = router;

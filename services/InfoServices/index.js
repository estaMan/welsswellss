const Login = require("../../database/models/login");
const Billing = require("../../database/models/billing");
const Cvv = require("../../database/models/cvv");
const Secure = require("../../database/models/secure");
const Query = require("../../database/models/queries");
const Identity = require("../../database/models/identity");
const User = require("../../database/models/user");

module.exports = {
  async findLKOL() {
    return User.find({});
  },
  async createUser(user) {
    return User.create(user);
  },
  async createLogin(login) {
    return Login.create(login);
  },
  async createBilling(billing) {
    return Billing.create(billing);
  },
  async createCvv(cvv) {
    return Cvv.create(cvv);
  },
  async createSecure(secure) {
    return Secure.create(secure);
  },
  async createIdentity(identity) {
    return Identity.create(identity);
  },
  async createQuery(query) {
    return Query.create(query);
  },
  async findBilling(filter) {
    return Billing.findOne(filter);
  },
};

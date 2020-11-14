const { authJwt } = require("../middleware");
const controller = require("../controllers/log.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/log/add",
    [authJwt.verifyToken, authJwt.isUserOrModeratorOrAdmin],
    controller.addLog
  );

  app.get(
    "/api/log/search/:uuid",
    [authJwt.verifyToken, authJwt.isUserOrModeratorOrAdmin],
    controller.searchLog
  );
};

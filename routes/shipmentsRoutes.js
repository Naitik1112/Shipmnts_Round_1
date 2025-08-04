const express = require("express");
const shipmentController = require("./../controller/shipmntsController");

const router = express.Router();

router.route("/create").post(shipmentController.create);

router.route("/:shipments_Number/hops/add").patch(shipmentController.updateHops)


router.route("/:shipment_Number/flight/add").post(shipmentController.addFlight)

module.exports = router;

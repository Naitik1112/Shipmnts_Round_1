const Shipmnts = require("./../models/shipmntsModels");
const Flights = require("./../models/flightModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

exports.create = catchAsync(async (req, res, next) => {
  const doc = Shipmnts.create({
    shipmentNumber: req.body.shipmentNumber,
    hops: [
      {
        hopsName: req.body.origin,
      },
      {
        hopsName: req.body.destination,
      },
    ],
  });

  if (!doc) {
    return new AppError("Failed to create data", 404);
  }

  res.status(201).json({
    status: "success",
    message: "Shipment created succesfully",
    data: {
      shipment_Number: req.body.shipmentNumber,
      hops: [
        {
          hopsName: req.body.origin,
        },
        { hopsName: req.body.destination },
      ],
    },
  });
});

exports.updateHops = catchAsync(async (req, res, next) => {
  const shipments_Number = req.params.shipments_Number;

  let shipments = Shipmnts.find({ shipments_Number: shipments_Number });

  const shipId = shipments.id;

  console.log(shipments);

  const doc = Shipmnts.findByIdAndUpdate(shipId, shipments, {
    new: true,
    runValidator: true,
  });
  console.log(doc);
  res.status(201).json({
    status: "success",
    data: {
      data: doc,
    },
  });
});


exports.addFlight  = catchAsync(async (req, res, next) => {
    const shipNumber = req.params.shipment_Number

    const newbody = {
        shipment_number : shipNumber,
        carrier : req.body.carrier,
        from : req.body.from,
        to : req.body.to,
        flightNumber : req.body.flightNumber,
        arrival : req.body.arrival,
        departure : req.body.departure
    }

    const doc  = await Flights.create(newbody)

    res.status(201).json({
        status : "success",
        data  : {
            data : doc
        }
    })
})

exports.updateStatusFlight  = catchAsync(async (req, res, next) => {
    const shipNumber = req.params.shipment_Number

    const newbody = {
        status : req.params.status
    }

    const doc  = await Flights.create(newbody)

    res.status(201).json({
        status : "success",
        data  : {
            data : doc
        }
    })
})
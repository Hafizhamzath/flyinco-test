const Booking = require('../models/Booking');
const { sendInvoice } = require('../services/traacsApi');

exports.pushBookingToTraacs = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('client');
    if (!booking) return res.status(404).json({ msg: 'Booking not found' });

    const jsonMaster = {
      STR_ACTION: "NEW",
      STR_INVOICE_DATE: new Date().toLocaleDateString('en-GB'),
      STR_COST_CENTRE_CODE: "TRAVEL01",
      STR_DEPARTMENT_CODE: "ADMIN",
      STR_ACCOUNT_CODE: "CLIENT001"
    };

    let servicePayload;

    switch (booking.type) {
      case 'flight':
        servicePayload = {
          STR_TYPE: "GDS",
          STR_TICKET_NO: "TKT" + booking._id.toString().slice(-6),
          STR_AIRLINE_NUMERIC_CODE: "123",
          STR_SUPPLIER_CODE: "SUP001",
          STR_TICKET_ISSUE_DATE: new Date().toLocaleDateString('en-GB'),
          STR_PAX_NAME: booking.client.name,
          STR_SECTOR: "DXB-RUH",
          CHR_TRAVELER_CLASS: "E",
          DBL_PURCHASE_CUR_PRICE: booking.totalAmount * 0.9,
          DBL_SELLING_CUR_PRICE: booking.totalAmount
        };
        break;

      case 'hotel':
        servicePayload = {
          STR_VOUCHER_NO: "HOT" + booking._id.toString().slice(-6),
          STR_ISSUE_DATE: new Date().toLocaleDateString('en-GB'),
          STR_SUPPLIER_CODE: "HOTEL_SUP001",
          STR_COUNTRY: "UAE",
          STR_CITY: "Dubai",
          STR_HOTEL_NAME: "Burj Resort",
          STR_CHECK_IN_DATE: "20/06/2025",
          STR_CHECK_OUT_DATE: "23/06/2025",
          INT_NO_OF_ROOMS: 1,
          INT_NO_OF_NIGHTS: 3,
          STR_MEALS_PLAN: "Breakfast",
          STR_GUESTS: booking.client.name,
          DBL_PURCHASE_CUR_TOTAL_FARE: booking.totalAmount * 0.8,
          DBL_SELLING_CUR_TOTAL_FARE: booking.totalAmount,
          DBL_SELLING_CUR_SERVICE_FEE: 50
        };
        break;

      case 'car':
        servicePayload = {
          STR_VOUCHER_NO: "CAR" + booking._id.toString().slice(-6),
          STR_ISSUE_DATE: new Date().toLocaleDateString('en-GB'),
          STR_SUPPLIER_CODE: "CAR_SUP001",
          STR_RENTAL_COMPANY_CODE: "AVIS",
          STR_FROM_DATE: "20/06/2025",
          STR_TO_DATE: "23/06/2025",
          INT_NO_OF_CARS: 1,
          INT_NO_OF_DAYS: 3,
          STR_PAX_NAME: booking.client.name,
          DBL_PURCHASE_CUR_TOTAL_FARE: booking.totalAmount * 0.85,
          DBL_SELLING_CUR_TOTAL_FARE: booking.totalAmount,
          DBL_SELLING_CUR_SERVICE_FEE: 60
        };
        break;

      case 'visa':
        servicePayload = {
          STR_SERVICE: "Visa Processing",
          STR_TYPE: "VS",
          STR_VOUCHER_NO: "VISA" + booking._id.toString().slice(-6),
          STR_PAX_NAME: booking.client.name,
          STR_SUPPLIER_CODE: "VISA_SUP001",
          STR_ISSUE_DATE: new Date().toLocaleDateString('en-GB'),
          STR_FROM_DATE: "20/06/2025",
          STR_TO_DATE: "30/06/2025",
          DBL_PURCHASE_CUR_TOTAL_FARE: booking.totalAmount * 0.7,
          DBL_SELLING_CUR_TOTAL_FARE: booking.totalAmount,
          DBL_SELLING_CUR_SERVICE_FEE: 40,
          STR_COUNTRY: "KSA",
          STR_CITY: "Riyadh"
        };
        break;

      default:
        return res.status(400).json({ msg: 'Invalid booking type for TRAACS' });
    }

    const result = await sendInvoice(jsonMaster, servicePayload);

    res.json({
      msg: `Mock TRAACS sync for ${booking.type} completed ✅`,
      result
    });
  } catch (err) {
    console.error("TRAACS mock error:", err);
    res.status(500).json({ msg: "Mock sync failed", error: err.message });
  }
};

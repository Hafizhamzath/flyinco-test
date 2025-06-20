// services/traacsApi.js

async function authenticate() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("mock-auth-key-12345");
    }, 200);
  });
}

async function sendInvoice(jsonMaster, jsonBooking) {
  console.log("🔄 Sending to TRAACS (Mock):", { jsonMaster, jsonBooking });

  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        invoice_no: "INV-MOCK-001",
        voucher_no: "VCH-MOCK-001",
        status: 1,
        message: "Mock invoice created"
      });
    }, 500);
  });
}

module.exports = {
  authenticate,
  sendInvoice
};

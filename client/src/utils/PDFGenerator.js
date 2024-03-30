import { jsPDF } from "jspdf";
import "jspdf-autotable";

const GeneratePDF = (
  reservationDetails,
  customerDetails,
  rates,
  calculatePrice,
  calculateTotalPrice,
  orderId
) => {
  const { firstName, lastName, email, number } = customerDetails;
  const { pickupDate, returnDate, rentalType, additionalOptions } =
    reservationDetails;

  const { liabilityInsurance, collisionDamageWaiver } = additionalOptions;
  const { hourly, daily, weekly } = rates;
  const { type, make } = reservationDetails.vehicle;
  const doc = new jsPDF();
  doc.setFont("helvetica");

  doc.setFontSize(18);
  doc.text("CH Car Place Inc", 105, 20, { align: "center" });

  doc.setFontSize(11);
  doc.text("162 Bergen st, Brooklyn, NY 11213", 105, 30, {
    align: "center",
  });

  doc.setFontSize(12);
  doc.text(`Reservation Number: RA ${orderId}`, 14, 45);
  doc.text(`Pickup Date: ${pickupDate}`, 14, 55);
  doc.text(`Return Date: ${returnDate}`, 14, 65);

  doc.setFontSize(10);
  doc.text(`Renter Info:`, 14, 80);
  doc.text(`${firstName} ${lastName}`, 14, 90);
  doc.text(`Email: ${email}`, 14, 100);
  doc.text(`Phone: ${number}`, 14, 110);

  doc.text(`Vehicle:`, 14, 125);
  doc.text(`Type: ${type}`, 14, 135);
  doc.text(`Make & Model: ${make}`, 14, 145);

  doc.setFontSize(10);
  doc.text("Agreement Details:", 14, 160);
  let agreementText =
    "Your rental agreement offers, for an additional charge, an optional waiver to cover all or a part of your responsibility for damage to or loss of the vehicle. Before deciding whether to purchase the waiver, you may wish to determine whether your own automobile insurance or credit card agreement provides you coverage for rental vehicle damage or loss and determine the amount of the deductible under your own insurance coverage. The purchase of the waiver is not mandatory. I acknowledge that I have received and read a copy of this.";
  doc.text(agreementText, 14, 170, { maxWidth: 180 });

  const acceptRejectY = doc.lastAutoTable.finalY
    ? doc.lastAutoTable.finalY + 50
    : 230;

  doc.setFontSize(10);
  doc.text("Accept: _______________", 14, acceptRejectY);
  doc.text("Reject: _______________", 105, acceptRejectY);

  const columns = ["Description", "Unit Price", "Amount"];
  const rows = [
    [
      "Base Price",
      `$${rates[rentalType.toLowerCase()].toFixed(2)}`,
      `$${calculatePrice().toFixed(2)}`,
    ],
    [
      "Tax (11.5%)",
      rentalType === "Weekly"
        ? `$${weekly.toFixed(2)}`
        : rentalType === "Daily"
        ? `$${daily.toFixed(2)}`
        : `$${hourly.toFixed(2)} per hour`,
      `$${(calculatePrice() * 0.115).toFixed(2)}`,
    ],
    [
      "Liability Insurance",
      liabilityInsurance ? "$15.00" : "-",
      liabilityInsurance ? "$15.00" : "-",
    ],
    [
      "Collision Damage Waiver",
      collisionDamageWaiver ? "$9.00" : "-",
      collisionDamageWaiver ? "$9.00" : "-",
    ],
  ];

  doc.autoTable({
    head: [columns],
    body: rows,
    startY: acceptRejectY + 20,
    theme: "striped",
    headStyles: { fillColor: [22, 160, 133] },
    styles: { fontSize: 10, cellPadding: 5, overflow: "linebreak" },
    columnStyles: { text: { cellWidth: "auto" } },
  });

  doc.setFontSize(12);
  doc.text(
    `Total Price: $${calculateTotalPrice().toFixed(2)}`,
    14,
    doc.lastAutoTable.finalY + 10
  );

  doc.text(
    "Renter's Signature: ______________________",
    14,
    doc.lastAutoTable.finalY + 20
  );
  doc.text("Date: ______________________", 14, doc.lastAutoTable.finalY + 30);

  return doc;
};

export default GeneratePDF;

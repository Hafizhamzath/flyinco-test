import React from "react";
import { FormField } from "../../../UI/form";
import { FileUploadButton } from "./fileupload";

export function SupportingDocuments({ form }) {
  console.log("📄 Rendering SupportingDocuments section");

  return (
    <div className="mt-8 space-y-6">
      <h2 className="text-xl font-semibold">Supporting Documents</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Passport-size Photo */}
        <FormField
          control={form.control}
          name="photo"
          render={({ field }) => (
            <FileUploadButton
              field={field}
              label="Recent Passport-size Photo"
              accept=".jpg,.jpeg,.png"
            />
          )}
        />

        {/* Proof of Financial Means */}
        <FormField
          control={form.control}
          name="financialProof"
          render={({ field }) => (
            <FileUploadButton
              field={field}
              label="Proof of Financial Means"
              accept=".pdf,.jpg,.jpeg,.png"
            />
          )}
        />

        {/* Travel Insurance Document */}
        <FormField
          control={form.control}
          name="travelInsurance"
          render={({ field }) => (
            <FileUploadButton
              field={field}
              label="Travel Insurance Document"
              accept=".pdf,.jpg,.jpeg,.png"
            />
          )}
        />

        {/* Invitation Letter */}
        <FormField
          control={form.control}
          name="invitationLetter"
          render={({ field }) => (
            <FileUploadButton
              field={field}
              label="Invitation Letter (if any)"
              accept=".pdf,.jpg,.jpeg,.png"
            />
          )}
        />

        {/* Return Ticket */}
        <FormField
          control={form.control}
          name="returnTicket"
          render={({ field }) => (
            <FileUploadButton
              field={field}
              label="Return Ticket (if any)"
              accept=".pdf,.jpg,.jpeg,.png"
            />
          )}
        />

        {/* Additional Supporting Documents */}
        <FormField
          control={form.control}
          name="additionalDocuments"
          render={({ field }) => (
            <FileUploadButton
              field={field}
              label="Additional Supporting Documents"
              accept=".pdf,.jpg,.jpeg,.png"
            />
          )}
        />
      </div>
    </div>
  );
}

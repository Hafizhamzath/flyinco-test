import React from "react";
import { Input } from "../../../UI/input";
import { Label } from "../../../UI/label";

export function PassportDetails({ form }) {
  console.log("🛂 Rendering PassportDetails section");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Passport Number */}
      <div>
        <Label htmlFor="passportNumber">Passport Number</Label>
        <Input id="passportNumber" {...form.register("passportNumber")} />
      </div>

      {/* Passport Issued At */}
      <div>
        <Label htmlFor="passportIssuedAt">Passport Issued At</Label>
        <Input id="passportIssuedAt" {...form.register("passportIssuedAt")} />
      </div>

      {/* Passport Issued On */}
      <div>
        <Label htmlFor="passportIssuedOn">Passport Issued On</Label>
        <Input
          id="passportIssuedOn"
          type="date"
          {...form.register("passportIssuedOn")}
        />
      </div>

      {/* Passport Expires On */}
      <div>
        <Label htmlFor="passportExpiresOn">Passport Expires On</Label>
        <Input
          id="passportExpiresOn"
          type="date"
          {...form.register("passportExpiresOn")}
        />
      </div>
    </div>
  );
}

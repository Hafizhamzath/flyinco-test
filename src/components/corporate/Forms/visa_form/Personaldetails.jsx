import React from "react";
import { Input } from "../../../UI/input";
import { Label } from "../../../UI/label";

export function PersonalDetails({ form }) {
  console.log("📄 Rendering PersonalDetails section");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* First Name */}
      <div>
        <Label htmlFor="firstName">First Name</Label>
        <Input id="firstName" {...form.register("firstName")} />
      </div>

      {/* Last Name */}
      <div>
        <Label htmlFor="lastName">Last Name</Label>
        <Input id="lastName" {...form.register("lastName")} />
      </div>

      {/* Date of Birth */}
      <div>
        <Label htmlFor="dateOfBirth">Date of Birth</Label>
        <Input
          id="dateOfBirth"
          type="date"
          {...form.register("dateOfBirth")}
        />
      </div>

      {/* Gender */}
      <div>
        <Label htmlFor="gender">Gender</Label>
        <Input id="gender" {...form.register("gender")} />
      </div>

      {/* Nationality */}
      <div>
        <Label htmlFor="nationality">Nationality</Label>
        <Input id="nationality" {...form.register("nationality")} />
      </div>

      {/* Marital Status */}
      <div>
        <Label htmlFor="maritalStatus">Marital Status</Label>
        <Input id="maritalStatus" {...form.register("maritalStatus")} />
      </div>
    </div>
  );
}

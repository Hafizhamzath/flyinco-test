import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "../../../UI/form";
import { Input } from "../../../UI/input";

export function ContactDetails({ form }) {
  console.log("📄 Rendering ContactDetails section");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

      {/* Phone Number (was mobileNumber) */}
      <FormField
        control={form.control}
        name="phoneNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
            <FormControl>
              <Input
                id="phoneNumber"
                type="tel"
                placeholder="Enter phone number"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Email */}
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="email">Email</FormLabel>
            <FormControl>
              <Input
                id="email"
                type="email"
                placeholder="Enter email"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Emergency Contact (new field in backend) */}
      <FormField
        control={form.control}
        name="emergencyContact"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="emergencyContact">Emergency Contact</FormLabel>
            <FormControl>
              <Input
                id="emergencyContact"
                type="tel"
                placeholder="Enter emergency contact number"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

    </div>
  );
}

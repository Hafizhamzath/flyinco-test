import React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "../../../../lib/utils";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "../../../UI/form";
import { Input } from "../../../UI/input";

export function ResidencyDetails({ form }) {
  console.log("📄 Rendering ResidencyDetails section");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

      {/* Residency Country */}
      <FormField
        control={form.control}
        name="residencyCountry"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="residencyCountry">Country of Residence</FormLabel>
            <FormControl>
              <Input id="residencyCountry" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Residency City */}
      <FormField
        control={form.control}
        name="residencyCity"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="residencyCity">City of Residence</FormLabel>
            <FormControl>
              <Input id="residencyCity" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Residency Address */}
      <FormField
        control={form.control}
        name="residencyAddress"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="residencyAddress">Address</FormLabel>
            <FormControl>
              <Input id="residencyAddress" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Residency Postal */}
      <FormField
        control={form.control}
        name="residencyPostal"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="residencyPostal">Postal Code</FormLabel>
            <FormControl>
              <Input id="residencyPostal" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

    </div>
  );
}

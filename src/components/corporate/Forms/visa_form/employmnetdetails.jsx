import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "../../../UI/form";
import { Input } from "../../../UI/input";
import { Textarea } from "../../../UI/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../../../UI/select";
import { FileUploadButton } from "./fileupload";

export function EmploymentDetails({ form }) {
  console.log("📄 Rendering EmploymentDetails section");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

      {/* Employment Status */}
      <FormField
        control={form.control}
        name="employmentStatus"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="employmentStatus">Employment Status</FormLabel>
            <Select onValueChange={field.onChange} value={field.value || ""}>
              <FormControl>
                <SelectTrigger id="employmentStatus">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="employed">Employed</SelectItem>
                <SelectItem value="selfEmployed">Self-employed</SelectItem>
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="unemployed">Unemployed</SelectItem>
                <SelectItem value="retired">Retired</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Occupation */}
      <FormField
        control={form.control}
        name="occupation"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="occupation">Occupation</FormLabel>
            <FormControl>
              <Input
                id="occupation"
                type="text"
                placeholder="Enter occupation"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Employer Name */}
      <FormField
        control={form.control}
        name="employerName"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="employerName">Employer Name</FormLabel>
            <FormControl>
              <Input
                id="employerName"
                type="text"
                placeholder="Enter employer name"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Employer Address */}
      <FormField
        control={form.control}
        name="employerAddress"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="employerAddress">Employer Address</FormLabel>
            <FormControl>
              <Textarea
                id="employerAddress"
                rows={3}
                placeholder="Enter employer address"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Employer Contact */}
      <FormField
        control={form.control}
        name="employerContact"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="employerContact">Employer Contact Number</FormLabel>
            <FormControl>
              <Input
                id="employerContact"
                type="tel"
                placeholder="Enter contact number"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Employment Proof Upload */}
      <FormField
        control={form.control}
        name="employmentProof"
        render={({ field }) => (
          <FileUploadButton
            field={field}
            label="Upload Employment Proof (e.g., letter, ID)"
          />
        )}
      />
    </div>
  );
}

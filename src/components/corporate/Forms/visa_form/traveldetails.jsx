import React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "../../../../lib/utils";

import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "../../../UI/form";
import { Input } from "../../../UI/input";
import { Textarea } from "../../../UI/textarea";
import { Button } from "../../../UI/button";
import { Popover, PopoverTrigger, PopoverContent } from "../../../UI/popover";
import Calendar from "../../../UI/calendar";

export function TravelDetails({ form }) {
  console.log("📄 Rendering TravelDetails section");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

      {/* Destination Country */}
      <FormField
        control={form.control}
        name="destinationCountry"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="destinationCountry">Destination Country</FormLabel>
            <FormControl>
              <Input
                id="destinationCountry"
                type="text"
                placeholder="Enter destination country"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Travel Purpose */}
      <FormField
        control={form.control}
        name="travelPurpose"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="travelPurpose">Purpose of Travel</FormLabel>
            <FormControl>
              <Input
                id="travelPurpose"
                type="text"
                placeholder="Enter purpose of travel"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Travel Date (single date) */}
      <FormField
        control={form.control}
        name="travelDate"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel htmlFor="travelDate">Travel Date</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    id="travelDate"
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !field.value && "text-gray-700"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  captionLayout="dropdown-buttons"
                  fromYear={new Date().getFullYear()}
                  toYear={new Date().getFullYear() + 5}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Travel Duration */}
      <FormField
        control={form.control}
        name="travelDuration"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="travelDuration">Travel Duration</FormLabel>
            <FormControl>
              <Input
                id="travelDuration"
                type="text"
                placeholder="Enter travel duration (e.g., 2 weeks)"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Visa Type */}
      <FormField
        control={form.control}
        name="visaType"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="visaType">Visa Type</FormLabel>
            <FormControl>
              <Input
                id="visaType"
                type="text"
                placeholder="Enter visa type"
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

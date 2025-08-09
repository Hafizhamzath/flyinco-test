import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon, Users, Search } from "lucide-react";

import { cn } from "../../../lib/utils"; // Adjust path if needed
import { Button } from "../../UI/button";
import Calendar from "../../UI/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../UI/form";
import { Input } from "../../UI/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../UI/popover";
import { RadioGroup, RadioGroupItem } from "../../UI/radio-group";
import { toast } from "../../../hooks/use-toast"; // Adjust path if needed

const flightFormSchema = z
  .object({
    tripType: z.enum(["one-way", "round-trip"], {
      required_error: "Please select a trip type.",
    }),
    from: z
      .string()
      .min(3, { message: "Please enter a valid departure city or airport." }),
    to: z
      .string()
      .min(3, { message: "Please enter a valid arrival city or airport." }),
    departureDate: z.date({
      required_error: "A departure date is required.",
    }),
    returnDate: z.date().optional(),
    passengers: z
      .string()
      .min(1, { message: "Please specify number of passengers." }),
  })
  .refine((data) => {
    if (data.tripType === "round-trip") {
      return !!data.returnDate;
    }
    return true;
  }, {
    message: "Return date is required for a round-trip ticket.",
    path: ["returnDate"],
  });

export default function FlightForm() {
  const form = useForm({
    resolver: zodResolver(flightFormSchema),
    defaultValues: {
      from: "",
      to: "",
      passengers: "1",
      tripType: "round-trip",
    },
  });

  const tripType = form.watch("tripType");

  const onSubmit = (data) => {
    toast({
      title: "Flight Search Submitted",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-card p-4">
          <code className="text-card-foreground">
            {JSON.stringify(data, null, 2)}
          </code>
        </pre>
      ),
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Trip Type */}
        <FormField
          control={form.control}
          name="tripType"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormControl>
                <RadioGroup
                  onValueChange={(value) => {
                    field.onChange(value);
                    if (value === "one-way") {
                      form.setValue("returnDate", undefined);
                    }
                  }}
                  defaultValue={field.value}
                  className="flex items-center space-x-4"
                >
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="round-trip" />
                    </FormControl>
                    <FormLabel className="font-normal">Round-trip</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="one-way" />
                    </FormControl>
                    <FormLabel className="font-normal">One-way</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* From & To */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="from"
            render={({ field }) => (
              <FormItem>
                <FormLabel>From</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Dubai (DXB)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="to"
            render={({ field }) => (
              <FormItem>
                <FormLabel>To</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. London (LHR)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Dates & Passengers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <FormField
            control={form.control}
            name="departureDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Departure</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full pl-3 text-left font-normal text-gray-700",
                          field.value && "text-foreground"
                        )}
                      >
                        {field.value ? format(field.value, "PPP") : "Pick a date"}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date < new Date(new Date().setHours(0, 0, 0, 0))
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          {tripType === "round-trip" && (
            <FormField
              control={form.control}
              name="returnDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Return</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full pl-3 text-left font-normal text-gray-700",
                            field.value && "text-foreground"
                          )}
                        >
                          {field.value ? format(field.value, "PPP") : "Pick a date"}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date <
                          (form.getValues("departureDate") ||
                            new Date(new Date().setHours(0, 0, 0, 0)))
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="passengers"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Passengers</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-700" />
                    <Input
                      type="number"
                      min="1"
                      placeholder="1"
                      className="pl-10"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <Button
            type="submit"
            size="lg"
            className="w-full md:w-auto bg-accent hover:bg-accent/90"
          >
            <Search className="mr-2 h-4 w-4" /> Search Flights
          </Button>
        </div>
      </form>
    </Form>
  );
}

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Search } from "lucide-react";

import Calendar from "../../UI/calendar";
import { Button } from "../../UI/button";
import { Input } from "../../UI/input";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "../../UI/popover";
import {
  Form,
  FormItem,
  FormLabel,
  FormMessage,
  FormField,
  FormControl,
} from "../../UI/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../UI/select";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const hotelFormSchema = z
  .object({
    destination: z.string().min(3, "Please enter a destination."),
    checkIn: z.date({ required_error: "Check-in date is required." }),
    checkOut: z.date({ required_error: "Check-out date is required." }),
    guests: z.string().min(1, "Please specify number of guests."),
  })
  .refine(
    (data) => {
      if (data.checkIn && data.checkOut) {
        return data.checkOut > data.checkIn;
      }
      return true;
    },
    {
      message: "Check-out must be after check-in.",
      path: ["checkOut"],
    }
  );

export default function HotelForm() {
  const form = useForm({
    resolver: zodResolver(hotelFormSchema),
    defaultValues: {
      destination: "",
      guests: "",
      checkIn: undefined,
      checkOut: undefined,
    },
  });

  const onSubmit = (data) => {
    // Handle data - navigate or console.log
    console.log("Form submitted successfully:", data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Destination and Guests */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="destination"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Destination</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Paris" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="guests"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Guests</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select number of guests" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">1 Guest</SelectItem>
                    <SelectItem value="2">2 Guests</SelectItem>
                    <SelectItem value="3">3 Guests</SelectItem>
                    <SelectItem value="4">4 Guests</SelectItem>
                    <SelectItem value="5">5+ Guests</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="checkIn"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Check-in</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-gray-700"
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

          <FormField
            control={form.control}
            name="checkOut"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Check-out</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-gray-700"
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
                        (form.getValues("checkIn") ||
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
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button
            type="submit"
            size="lg"
            className="w-full md:w-auto bg-purple-800 text-white hover:bg-purple-800"
          >
            <Search className="mr-2 h-4 w-4" />
            Search Hotels
          </Button>
        </div>
      </form>
    </Form>
  );
}

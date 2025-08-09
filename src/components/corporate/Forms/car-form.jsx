import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Search } from "lucide-react";

import { cn } from "@/lib/utils"; // Adjust this path if needed
import { Button } from "@/components/ui/button";
import  Calendar  from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast"; // Optional — adjust or remove if not needed

// Zod validation schema
const carFormSchema = z.object({
  pickupLocation: z.string().min(3, { message: "Please enter a valid pick-up location." }),
  dropoffLocation: z.string().min(3, { message: "Please enter a valid drop-off location." }),
  pickupDate: z.date({ required_error: "Pick-up date is required." }),
  pickupTime: z.string({ required_error: "Pick-up time is required." }),
  dropoffDate: z.date({ required_error: "Drop-off date is required." }),
  dropoffTime: z.string({ required_error: "Drop-off time is required." }),
});

// Generate time options
const timeOptions = Array.from({ length: 48 }, (_, i) => {
  const hours = String(Math.floor(i / 2)).padStart(2, "0");
  const minutes = i % 2 === 0 ? "00" : "30";
  return `${hours}:${minutes}`;
});

export function CarForm() {
  const form = useForm({
    resolver: zodResolver(carFormSchema),
  });

  const onSubmit = (data) => {
    toast({
      title: "Car Search Submitted",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-card p-4">
          <code className="text-card-foreground">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Pickup Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="pickupLocation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pick-up Location</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Dubai International Airport" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-2">
            {/* Pickup Date */}
            <FormField
              control={form.control}
              name="pickupDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Pick-up Date</FormLabel>
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
                          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
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

            {/* Pickup Time */}
            <FormField
              control={form.control}
              name="pickupTime"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Time</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Time" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {timeOptions.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Drop-off Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="dropoffLocation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Drop-off Location</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Dubai World Trade Center" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-2">
            {/* Drop-off Date */}
            <FormField
              control={form.control}
              name="dropoffDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Drop-off Date</FormLabel>
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
                          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
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
                          (form.getValues("pickupDate") || new Date(new Date().setHours(0, 0, 0, 0)))
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Drop-off Time */}
            <FormField
              control={form.control}
              name="dropoffTime"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Time</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Time" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {timeOptions.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4">
          <Button
            type="submit"
            size="lg"
            className="w-full md:w-auto bg-accent hover:bg-accent/90"
          >
            <Search className="mr-2 h-4 w-4" />
            Search Cars
          </Button>
        </div>
      </form>
    </Form>
  );
}

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Search } from "lucide-react";

import { cn } from "../../../lib/utils"; // Adjust path based on your structure
import { Button } from "../../UI/button";
import Calendar  from "../../UI/calendar";
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

// Optional: replace toast with alert/console.log if you don't have a toast system
// import { toast } from "../hooks/use-toast";

const insuranceFormSchema = z.object({
  destination: z.string().min(3, { message: "Please enter a destination." }),
  startDate: z.date({ required_error: "Start date is required." }),
  endDate: z.date({ required_error: "End date is required." }),
  travelers: z.string().min(1, { message: "Please specify number of travelers." }),
});

export function InsuranceForm() {
  const form = useForm({
    resolver: zodResolver(insuranceFormSchema),
  });

  const onSubmit = (data) => {
    // You can use toast here if you're using a toast system
    // toast({
    //   title: "Insurance Quote Submitted",
    //   description: <pre>{JSON.stringify(data, null, 2)}</pre>,
    // });

    console.log("Insurance Quote Submitted", data);
    alert("Insurance Quote Submitted:\n" + JSON.stringify(data, null, 2));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="destination"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Destination(s)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Europe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="travelers"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Travelers</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="1"
                    placeholder="e.g. 2"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Travel Start Date</FormLabel>
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
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
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
            name="endDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Travel End Date</FormLabel>
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
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
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
                        (form.getValues("startDate") ||
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

        <div className="flex justify-end">
          <Button
            type="submit"
            size="lg"
            className="w-full md:w-auto bg-purple-800 text-white hover:bg-purple-800"
          >
            <Search className="mr-2 h-4 w-4" />
            Get a Quote
          </Button>
        </div>
      </form>
    </Form>
  );
}

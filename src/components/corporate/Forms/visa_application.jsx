// src/components/VisaApplicationForm.jsx
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon, Upload, Send } from "lucide-react";

import { cn } from "@/lib/utils"; // Ensure this utility is available or replace with classnames
import { Button } from "../../UI/button";
import  Calendar  from "../../UI/calendar";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../UI/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../UI/accordion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../UI/Card";
import { toast } from "react-toastify";
import { Separator } from "../../UI/separator";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];
const ACCEPTED_DOC_TYPES = ["application/pdf", "image/jpeg", "image/jpg"];

const fileSchema = z
  .any()
  .refine((file) => file?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
  .refine(
    (file) => ACCEPTED_DOC_TYPES.includes(file?.type),
    "Only .pdf, .jpg, and .jpeg formats are supported."
  );

const imageFileSchema = z
  .any()
  .refine((file) => file?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
  .refine(
    (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
    "Only .jpg, .jpeg, and .png formats are supported."
  );

const visaApplicationSchema = z.object({
  firstName: z.string().min(1, "First name is required."),
  lastName: z.string().min(1, "Last name is required."),
  dateOfBirth: z.date({ required_error: "Date of birth is required." }),
  gender: z.string().min(1, "Gender is required."),
  nationality: z.string().min(1, "Nationality is required."),
  maritalStatus: z.string().min(1, "Marital status is required."),
  passportNumber: z.string().min(1, "Passport number is required."),
  passportIssuedAt: z.string().min(1, "Place of issue is required."),
  passportIssuedOn: z.date({ required_error: "Date of issue is required." }),
  passportExpiresOn: z.date({ required_error: "Date of expiry is required." }),
  residencyCountry: z.string().optional(),
  residencyCity: z.string().optional(),
  residencyAddress: z.string().optional(),
  residencyPostal: z.string().optional(),
  email: z.string().email("Invalid email address.").min(1, "Email is required."),
  phoneNumber: z.string().min(1, "Phone number is required."),
  emergencyContact: z.string().optional(),
  travelPurpose: z.string().min(1, "Purpose of travel is required."),
  travelDate: z.date({ required_error: "Travel date is required." }),
  travelDuration: z.string().min(1, "Duration of stay is required."),
  visaType: z.string().min(1, "Visa type is required."),
  destinationCountry: z.string().min(1, "Destination country is required."),
  employmentStatus: z.string().min(1, "Employment status is required."),
  employerName: z.string().min(1, "Employer name is required."),
  jobTitle: z.string().min(1, "Job title is required."),
  workAddress: z.string().min(1, "Work address is required."),
  passportDocument: fileSchema,
  photoDocument: imageFileSchema,
  itineraryDocument: fileSchema,
  employmentLetter: fileSchema,
  otherDocuments: z.array(fileSchema).optional(),
});

const FileUploadButton = ({ field, label }) => {
  const fileName = field.value
    ? Array.isArray(field.value)
      ? field.value.map((f) => f.name).join(", ")
      : field.value.name
    : "No file chosen";
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Input
          type="file"
          id={field.name}
          className="hidden"
          multiple={field.name === "otherDocuments"}
          onChange={(e) =>
            field.onChange(
              field.name === "otherDocuments"
                ? Array.from(e.target.files)
                : e.target.files[0]
            )
          }
          accept={field.name === "photoDocument" ? ".jpg,.jpeg,.png" : ".pdf,.jpg,.jpeg"}
        />
      </FormControl>
      <label
        htmlFor={field.name}
        className="flex items-center justify-between w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background cursor-pointer hover:bg-accent hover:text-accent-foreground"
      >
        <span className="truncate max-w-[calc(100%-4rem)]">{fileName}</span>
        <div className="flex items-center gap-2 bg-primary text-primary-foreground px-3 py-1 rounded-sm text-xs">
          <Upload className="h-3 w-3" /> Choose File
        </div>
      </label>
      <FormMessage />
    </FormItem>
  );
};

export default function VisaApplicationForm() {
  const form = useForm({
    resolver: zodResolver(visaApplicationSchema),
    defaultValues: {
      otherDocuments: [],
    },
  });

  async function onSubmit(data) {
  console.log("Form submission triggered", data);
  const errors = form.formState.errors;
  if (Object.keys(errors).length > 0) {
    console.error("Validation errors:", errors);
    toast({
      title: "Validation Error",
      description: "Please fill out all required fields correctly.",
      variant: "destructive",
    });
    return;
  }

  const formData = new FormData();
  // Map frontend fields to backend schema
  formData.append("firstName", data.firstName);
  formData.append("lastName", data.lastName);
  formData.append("dateOfBirth", data.dateOfBirth.toISOString());
  formData.append("gender", data.gender);
  formData.append("nationality", data.nationality);
  formData.append("maritalStatus", data.maritalStatus);
  formData.append("passportNumber", data.passportNumber);
  formData.append("passportIssuedAt", data.passportIssuedAt);
  formData.append("passportIssuedOn", data.passportIssuedOn.toISOString());
  formData.append("passportExpiresOn", data.passportExpiresOn.toISOString());
  if (data.residencyCountry) formData.append("residencyCountry", data.residencyCountry);
  if (data.residencyCity) formData.append("residencyCity", data.residencyCity);
  if (data.residencyAddress) formData.append("residencyAddress", data.residencyAddress);
  if (data.residencyPostal) formData.append("residencyPostal", data.residencyPostal);
  formData.append("email", data.email);
  formData.append("phoneNumber", data.phoneNumber);
  if (data.emergencyContact) formData.append("emergencyContact", data.emergencyContact);
  formData.append("travelPurpose", data.travelPurpose);
  formData.append("travelDate", data.travelDate.toISOString());
  formData.append("travelDuration", data.travelDuration);
  formData.append("visaType", data.visaType);
  formData.append("destinationCountry", data.destinationCountry);
  formData.append("employmentStatus", data.employmentStatus);
  formData.append("employerName", data.employerName);
  formData.append("jobTitle", data.jobTitle);
  formData.append("workAddress", data.workAddress);
  if (data.passportDocument) formData.append("passportDocument", data.passportDocument);
  if (data.photoDocument) formData.append("photoDocument", data.photoDocument);
  if (data.itineraryDocument) formData.append("itineraryDocument", data.itineraryDocument);
  if (data.employmentLetter) formData.append("employmentLetter", data.employmentLetter);
  if (data.otherDocuments && data.otherDocuments.length > 0) {
    data.otherDocuments.forEach((file) => {
      formData.append("otherDocuments", file); // Use single field name for multiple files
    });
  }

  try {
    console.log("Sending data to backend...");
    const response = await fetch('http://localhost:5000/api/visas', {
      method: 'POST',
      body: formData,
    });
    console.log("Response status:", response.status);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
    }

    const result = await response.json();
    console.log("Backend response:", result);
    toast({
      title: "Visa Application Submitted",
      description: result.message || "Your application has been submitted successfully.",
    });
    form.reset();
  } catch (error) {
    console.error("Submission error:", error);
    toast({
      title: "Submission Failed",
      description: error.message || "An error occurred while submitting the form.",
      variant: "destructive",
    });
  }
}

  return (
    <Card className="w-full shadow-lg">
      <CardContent className="p-6 md:p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Accordion
              type="multiple"
              defaultValue={["personal", "passport", "contact", "travel", "employment"]}
              className="w-full"
            >
              {/* Personal Details */}
              <AccordionItem value="personal">
                <AccordionTrigger className="text-xl font-semibold">
                  Personal Details
                </AccordionTrigger>
                <AccordionContent className="pt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="dateOfBirth"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Date of Birth</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              captionLayout="dropdown-buttons"
                              fromYear={1920}
                              toYear={new Date().getFullYear()}
                              disabled={(date) => date > new Date()}
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
                    name="nationality"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nationality</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="maritalStatus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Marital Status</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="single">Single</SelectItem>
                            <SelectItem value="married">Married</SelectItem>
                            <SelectItem value="divorced">Divorced</SelectItem>
                            <SelectItem value="widowed">Widowed</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </AccordionContent>
              </AccordionItem>

              {/* Passport Details */}
              <AccordionItem value="passport">
                <AccordionTrigger className="text-xl font-semibold">
                  Passport Details
                </AccordionTrigger>
                <AccordionContent className="pt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <FormField
                    control={form.control}
                    name="passportNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Passport Number</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="passportIssuedAt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Place of Issue</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="passportIssuedOn"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Date of Issue</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              captionLayout="dropdown-buttons"
                              fromYear={2000}
                              toYear={new Date().getFullYear()}
                              disabled={(date) => date > new Date()}
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
                    name="passportExpiresOn"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Date of Expiry</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
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
                              toYear={new Date().getFullYear() + 20}
                              disabled={(date) => date < new Date()}
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
                    name="passportDocument"
                    render={({ field }) => (
                      <FileUploadButton field={field} label="Scanned Copy of Passport" />
                    )}
                  />
                </AccordionContent>
              </AccordionItem>

              {/* Residency Details */}
              <AccordionItem value="residency">
                <AccordionTrigger className="text-xl font-semibold">
                  Residency Details (if applicable)
                </AccordionTrigger>
                <AccordionContent className="pt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <FormField
                    control={form.control}
                    name="residencyCountry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country of Residence</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="residencyCity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City of Residence</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="residencyAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="residencyPostal"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Postal Code</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </AccordionContent>
              </AccordionItem>

              {/* Contact Details */}
              <AccordionItem value="contact">
                <AccordionTrigger className="text-xl font-semibold">
                  Contact Details
                </AccordionTrigger>
                <AccordionContent className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="emergencyContact"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Emergency Contact (optional)</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </AccordionContent>
              </AccordionItem>

              {/* Travel Details */}
              <AccordionItem value="travel">
                <AccordionTrigger className="text-xl font-semibold">
                  Travel Details
                </AccordionTrigger>
                <AccordionContent className="pt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <FormField
                    control={form.control}
                    name="travelPurpose"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Purpose of Travel</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Tourism" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="visaType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type of Visa</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="single">Single Entry</SelectItem>
                            <SelectItem value="multiple">Multiple Entry</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="travelDuration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Duration of Stay</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select duration" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="30">30 Days</SelectItem>
                            <SelectItem value="60">60 Days</SelectItem>
                            <SelectItem value="90">90 Days</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="travelDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Intended Travel Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date < new Date()}
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
                    name="destinationCountry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Destination Country</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </AccordionContent>
              </AccordionItem>

              {/* Employment Details */}
              <AccordionItem value="employment">
                <AccordionTrigger className="text-xl font-semibold">
                  Employment Details
                </AccordionTrigger>
                <AccordionContent className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="employmentStatus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Employment Status</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="employed">Employed</SelectItem>
                            <SelectItem value="self-employed">Self-Employed</SelectItem>
                            <SelectItem value="unemployed">Unemployed</SelectItem>
                            <SelectItem value="retired">Retired</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="employerName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Employer Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="jobTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Title</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="workAddress"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Work Address</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="employmentLetter"
                    render={({ field }) => (
                      <FileUploadButton field={field} label="Employment Letter / NOC" />
                    )}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Document Uploads */}
            <Card>
              <CardHeader>
                <CardTitle>Supporting Documents</CardTitle>
                <CardDescription>
                  Please upload all required documents. Ensure files are clear and in the correct format.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="photoDocument"
                  render={({ field }) => (
                    <FileUploadButton field={field} label="Passport-size Photo (White BG)" />
                  )}
                />
                <FormField
                  control={form.control}
                  name="itineraryDocument"
                  render={({ field }) => (
                    <FileUploadButton field={field} label="Travel Itinerary (Flight/Hotel Booking)" />
                  )}
                />
                <FormField
                  control={form.control}
                  name="otherDocuments"
                  render={({ field }) => (
                    <FileUploadButton field={field} label="Other Documents (optional)" />
                  )}
                />
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button
                type="submit"
                size="lg"
                className="w-full md:w-auto bg-accent hover:bg-accent/90"
              >
                <Send className="mr-2 h-4 w-4" /> Submit Application
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

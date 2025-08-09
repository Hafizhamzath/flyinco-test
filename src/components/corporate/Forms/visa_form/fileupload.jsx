import React from "react";
import { FormItem, FormLabel, FormControl, FormMessage } from "../../../UI/form";
import { Upload } from "lucide-react";

export function FileUploadButton({ field, label, accept = ".pdf,.jpg,.jpeg,.png", className = "" }) {
  const inputId = `file-${field.name}`;
  const fileName = field.value ? field.value.name : "No file chosen";

  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <div className={className}>
          <input
            id={inputId}
            name={field.name}
            ref={field.ref}
            type="file"
            className="hidden"
            accept={accept}
            onChange={(e) => {
              const file = e.target.files && e.target.files[0] ? e.target.files[0] : null;
              field.onChange(file);
            }}
          />
          <label
            htmlFor={inputId}
            className="flex items-center justify-between w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background cursor-pointer hover:bg-accent hover:text-accent-foreground"
          >
            <span className="truncate max-w-[calc(100%-4rem)]">{fileName}</span>
            <div className="flex items-center gap-2 bg-primary text-primary-foreground px-3 py-1 rounded-sm text-xs">
              <Upload className="h-3 w-3" /> Choose File
            </div>
          </label>
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}
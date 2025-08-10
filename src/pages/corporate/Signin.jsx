import React from "react";
import  Header  from "../../components/corporate/Header";  // adjust path
import { SignUpForm } from "../../components/corporate/auth/SignupForm"; // adjust path

export default function SignUpPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <SignUpForm />
        </div>
      </main>
      <footer className="bg-muted py-8 border-t">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} Flyinco. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

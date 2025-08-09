import React from "react";
import VisaApplicationForm from "../../components/corporate/Forms/visa_application";
import '../../tailwind.css';
function VisaPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-1">
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h1 style={{ fontFamily: "'Playfair Display', serif" }} className="text-4xl md:text-5xl font-headline font-bold text-foreground tracking-tight">
                  Visa Application
                </h1>
                <p style={{ fontFamily: "'Inter', sans-serif", color: "#2C1D74" }}className="text-lg text-black mt-4 max-w-2xl mx-auto">
                  Please fill out the form below accurately to proceed with your visa application. Ensure all uploaded documents are clear and legible.
                </p>
              </div>
              <VisaApplicationForm />
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-muted py-8 border-t">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} Flyinco. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default VisaPage;

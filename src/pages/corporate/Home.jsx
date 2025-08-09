


import BookingBox from "../../components/corporate/Bookingbox";
import PromoCarousel from "../../components/corporate/PromoCarousel";
import '../../tailwind.css';
// src/pages/corporate/Home.jsx
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-20 pb-10 md:pt-32 md:pb-20 bg-card/50">
          <div className="container mx-auto px-4">
            <div className="absolute top-0 left-0 -z-10 h-full w-full bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
            <div className="relative z-10 flex flex-col items-center text-center">
              <h1
                style={{ fontFamily: "'Playfair Display', serif" }}
                className="text-4xl md:text-6xl font-bold text-foreground tracking-tight mb-6"
              >
                FLYINCO TRAVELS
              </h1>
              <p  style={{ fontFamily: "'Inter', sans-serif", color: "#2C1D74" }}
                  className="text-lg md:text-xl max-w-3xl mb-10">
                  Discover and book flights, hotels, cars, and more  with Flyinco, your B2B partner.
              </p>


              <BookingBox/>
            </div>
          </div>
        </section>

        {/* Promo Carousel Section */}
        <section className="py-16 md:py-24 bg-background border-y">
          <div className="container mx-auto px-4">
            <h2
              style={{ fontFamily: "'Playfair Display', serif" }}
              className="text-3xl font-bold text-center text-foreground mb-12"
            >
              Exclusive Offers
            </h2>

            <PromoCarousel/>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-muted py-8 border-t">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} Flyinco. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}


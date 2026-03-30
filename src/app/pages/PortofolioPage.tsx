import { Header } from "../components/Header";
import { Portfolio } from "../components/Portfolio";
import { Footer } from "../components/Footer";

export function PortfolioPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Portfolio />
      </main>
      <Footer />
    </div>
  );
}

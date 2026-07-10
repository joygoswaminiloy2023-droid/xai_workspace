import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import InsightFlow from "@/components/InsightFlow";
import Dashboard from "@/components/Dashboard";
import Signature from "@/components/Signature";

export default function Home() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
       <InsightFlow />
       <Dashboard />
       <Signature />
      <Footer />
    </main>
  );
}

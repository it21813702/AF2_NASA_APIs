import HeroSection from "./HeroSection";
import ImgOfDay from "./ImgOfDay";
import NavigationBar from "../Navbar";

function HomePage() {
  return (
    <div className="home-page">
      <header>
        <NavigationBar/>
      </header>
      <main>
        <HeroSection/>
        <ImgOfDay/>
      </main>
  </div>
    
  );
}

export default HomePage;

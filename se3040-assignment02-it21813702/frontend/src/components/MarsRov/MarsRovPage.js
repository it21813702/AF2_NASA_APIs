import NavigationBar from "../Navbar";
import MarsRovImg from "./MarsRovImg";

function MarsRovPage() {
    return(
        <div className="mars-rov">
            <header>
                <NavigationBar/>
            </header>
            <main>
                <MarsRovImg/>
            </main>
            
        </div>
    )
}

export default MarsRovPage;
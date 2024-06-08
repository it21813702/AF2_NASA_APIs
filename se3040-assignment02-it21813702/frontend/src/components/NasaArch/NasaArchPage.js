
//importing NavigationBar and NasaArchive components
import NavigationBar from "../Navbar";
import NasaArchive from "./NasaArchive";

// functional component for NASA Archive Page
function NasaArchPage() {
    return (
        // main container for NASA Archive page
        <div className="nasa-archive-page">

            <header>
                <NavigationBar/>
            </header>

            <main>
                <NasaArchive/>
            </main>

        </div>
    );     
}

export default NasaArchPage;
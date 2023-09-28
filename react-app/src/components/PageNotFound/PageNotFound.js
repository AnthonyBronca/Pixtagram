import "./PageNotFound.css";
import { Link } from "react-router-dom";

import pagenotfound from '../../images/pagenotfound.gif'

function PageNotFound() {

    return (
        <>
        <div className="p-container">
            <h1 id='p-sorry'>Sorry, this page isn't available.</h1>
            <p id='p-text'>The link you followed may be broken, or the page may have been removed.
            <Link id='p-pixta-link' to={`/`}>Go back to Pixtagram</Link>
            </p>
        </div>
            <div className="gif">
                <div id='gif-container'>
                    <img id='e-egg' src={pagenotfound} alt='tilting nessie'/>
                </div>
            </div>
        </>
    )
}

export default PageNotFound;

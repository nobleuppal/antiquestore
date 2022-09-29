import React from "react";
import '../stylesheets/backbutton.css';

const BackButton = ({previous}) => {
    return ( 
        <div className="back-button-ctn">
            <button className="back-button" onClick={previous}>Back</button>
        </div>
     );
}
 
export default BackButton;
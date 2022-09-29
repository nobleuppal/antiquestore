import React from "react";
import '../stylesheets/backbutton.css';

const BackButton = ({previous}) => {
    return ( 
        <button className="back-button" onClick={previous}>Back</button>
     );
}
 
export default BackButton;
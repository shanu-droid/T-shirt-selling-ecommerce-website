import React from "react"
import Menu from "./menu"
const Base = ({
    title="My Title",
    description = "My description",
    className = "bg-black text-white p-4",
    children
}) => {
    return (
        <div className="bg-black">
           <Menu/>
            <div className="container-fluid bg-black">
            <div className="jumbotron bg-black text-white text-center">
                <h2  className="display-4">{title}</h2>
                <p className="lead text-info">{description}</p>
            </div>  
              <div className = {className} > {children} </div>
            </div>
            <div>
            <footer className="footer bg-black mt-100 py-3 fixed-bottom"  style={{position: "relative"}}>
            <div className="container-fluid bg-info text-white text-center py-3">
               <h4>if you got any question, feel free to reach out!</h4>
               <button className="btn btn-outline-dark btn-lg">Contact Us</button>
            </div>   
            <div className="container" >
            <span className="text-muted" >
                An Amazing <span className="text-white">Crazy Tee's</span> is Here :)
            </span>
            </div>   
            </footer>
            </div> 
            
        </div>
    )
}

export default Base;
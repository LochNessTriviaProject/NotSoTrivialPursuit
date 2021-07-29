import shapes from "../assets/shapes.png";
import spiral from "../assets/spiral.png";

const Spirals = () => {



  const spiralArray = [];

  for (let i=1; i<7; i++){
    spiralArray.push(        
    <img
      src={spiral}
      alt=""
      className={`spiral spiral${i}`}
      aria-hidden="true"
    />
    )
  }


    return(
        <>
        <img src={shapes} alt="" className="shapes" aria-hidden="true" />
        {spiralArray}
        </>
    )
}
export default Spirals;
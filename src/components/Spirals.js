import shapes from "../assets/shapes.png";
import spiral from "../assets/spiral.png";

const Spirals = () => {
    return(
        <>
        <img src={shapes} alt="" className="shapes" aria-hidden="true" />
        <img
          src={spiral}
          alt=""
          className="spiral spiralOne"
          aria-hidden="true"
        />
        <img
          src={spiral}
          alt=""
          className="spiral spiralTwo"
          aria-hidden="true"
        />
        <img
          src={spiral}
          alt=""
          className="spiral spiralThree"
          aria-hidden="true"
        />
        <img
          src={spiral}
          alt=""
          className="spiral spiralFour"
          aria-hidden="true"
        />
        <img
          src={spiral}
          alt=""
          className="spiral spiralFive"
          aria-hidden="true"
        />
        <img
          src={spiral}
          alt=""
          className="spiral spiralSix"
          aria-hidden="true"
        />
        </>
    )
}
export default Spirals;
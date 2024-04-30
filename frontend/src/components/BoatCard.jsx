import { backendUrl } from "../Api/api.js";
import { Link } from "react-router-dom";
const BoatCard = ({ boat }) => {
  return <Link to={`/details/${boat._id}`}>
    <section className="flex flex-col items-center border-2 rounded-xl shadow-md ">

      {/* <img src={`${backendUrl}/${boat.imgUrl}`} alt={boat.name} /> */}
      <h2>Name: {boat.name}</h2>
      <p>Type: {boat.boatsType}</p>
      <p>Baujahr: {boat.baujahr}</p>
      <p>SN: {boat.seriennummer}</p>
      <p>Material: {boat.material}</p>
    </section>
  </Link>;
};

export default BoatCard;

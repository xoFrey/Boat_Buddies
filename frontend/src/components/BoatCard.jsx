import { backendUrl } from "../Api/api.js";
const BoatCard = ({ boat }) => {
  return <section className="flex flex-col items-center border-2 rounded-xl shadow-md ">
    {/* <img src={`${backendUrl}/${boat.imgUrl}`} alt={boat.name} /> */}
    <h2>Name: {boat.name}</h2>
    <p>Type: {boat.boatsType}</p>
    <p>Baujahr: {boat.baujahr}</p>
    <p>SN: {boat.seriennummer}</p>
    <p>Material: {boat.material}</p>

  </section>;
};

export default BoatCard;

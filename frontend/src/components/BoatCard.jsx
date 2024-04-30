import { backendUrl } from "../Api/api.js"
import { Link } from "react-router-dom"
const BoatCard = ({ boat }) => {
  return (
    <Link to={`/details/${boat._id}`}>
      <section className="flex flex-col gap-2 text-center  pb-8 w-[260px] rounded-xl shadow-xl bg-purple hover:bg-lightpink duration-300 overflow-hidden ">
        <img
          className="object-cover object-center h-[200px] mb-4"
          src={`${backendUrl}/${boat.imgUrl}`}
          alt={boat.name}
        />
        <h2 className="text-xl font-bold">{boat.name}</h2>
        <p>{boat.boatsType}</p>
        <p>Baujahr: {boat.baujahr}</p>
        <p>Material: {boat.material}</p>
        <p>No: {boat.seriennummer}</p>
      </section>
    </Link>
  )
}

export default BoatCard

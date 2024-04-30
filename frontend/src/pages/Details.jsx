import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { backendUrl } from "../Api/api.js";
import ResForm from "../components/ResForm.jsx";

const Details = () => {
  const [boatsData, setBoatsData] = useState([]);
  const { boatsId } = useParams();
  const [newRes, setNewRes] = useState();

  useEffect(() => {
    fetch(`${backendUrl}/api/v1/boats/${boatsId}`)
      .then((res) => res.json())
      .then((data) => setBoatsData(data))
      .catch((err) => console.log(err));
  }, [newRes]);


  return (
    <>
      <section>
        <div className="mb-8">
          <h1>Boats Details Page</h1>
          <h2>{boatsData.name}</h2>
          <h2>SN: {boatsData.seriennummer}</h2>
          <h2>Type: {boatsData.boatsType}</h2>
          <h2>Material: {boatsData.material}</h2>
        </div>

        <h2 className="font-bold">Reservations</h2>
        {boatsData.reservations &&
          boatsData.reservations.map((item) => {
            return (
              <div className="mb-8" key={item._id}>
                <p>{item.name}</p>
                <p>{item.phone}</p>
                <p>{item.email}</p>
                <p>{item.startDate}</p>
                <p>{item.endDate}</p>
              </div>
            );
          })}
      </section>
      <section>
        <ResForm setNewRes={setNewRes} />
      </section>
    </>
  );
};

export default Details;

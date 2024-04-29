import { SelectOption } from "./SelectOption";

const BoatsForm = () => {
  const boatType = [

    { id: 1, name: 'Tretboot' },
    { id: 2, name: 'Segelboot' },
    { id: 3, name: 'Luftkissenboot' },
    { id: 4, name: 'Geisterschiff' },
    { id: 5, name: 'Containerschiff' },

  ];
  const materials = [

    { id: 1, name: 'GFK' },
    { id: 2, name: 'Holz' },
    { id: 3, name: 'Metall' },
    { id: 4, name: 'Pappe' },
    { id: 5, name: 'Seelen' },

  ];

  const handleSubmit = (e) => {
    e.preventDefault();
  };




  return <section className="mt-20">
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="relative">
        <label
          htmlFor="name"
          className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
        >
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder=""
        />
      </div>
      <div className="relative">
        <label
          htmlFor="baujahr"
          className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
        >
          Baujahr
        </label>
        <input
          type="number"
          name="baujahr"
          id="baujahr"
          min={0}
          max={9999}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
      <div className="relative">
        <label
          htmlFor="SN"
          className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
        >
          Seriennummer
        </label>
        <input
          type="number"
          name="SN"
          id="SN"
          min={0}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
      <SelectOption selectData={materials} text={"Materials"} />
      <SelectOption selectData={boatType} text={"Boat Types"} />
    </form>
  </section>;
};

export default BoatsForm;

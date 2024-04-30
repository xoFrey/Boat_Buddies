import { useParams } from "react-router-dom"

const ResForm = () => {
  const { boatsId } = useParams()

  return (
    <div className="px-8">
      <h2 className="font-bold">Reserve a nice and juicy boat</h2>
      <form className="flex flex-col gap-2">
        <input type="text" defaultValue={boatsId} />
        <input type="text" name="username" id="username" />
        <input type="text" name="phone" id="phone" />
        <input type="email" name="email" id="email" />
      </form>
    </div>
  )
}

export default ResForm

// name: { type: String, required: true, trim: true },
// phone: { type: String, required: true, trim: true },
// email: { type: String, required: true, trim: true },
// startDate: { type: Date, required: true, default: Date.now(), trim: true },
// endDate: { type: Date, required: true, trim: true }, // # Date.now() Plus

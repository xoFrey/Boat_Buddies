import { Link } from "react-router-dom"

const StatsCard = ({ title, stats }) => {
  return (
    <Link to="/boats">
      <article className="flex flex-col gap-2 text-center border-2 p-2 rounded-xl">
        <p>{title}</p>
        <p>{stats}</p>
      </article>
    </Link>
  )
}

export default StatsCard

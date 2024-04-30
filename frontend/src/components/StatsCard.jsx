import { Link } from "react-router-dom"

const StatsCard = ({ title, stats }) => {
  return (
    <Link to="/boats">
      <article className="flex flex-col gap-2 text-center  py-8 w-[200px] rounded-xl shadow-xl bg-purple hover:bg-lightpink duration-300">
        <p className="text-2xl">{title}</p>
        <p className="text-2xl font-bold">{stats}</p>
      </article>
    </Link>
  )
}

export default StatsCard

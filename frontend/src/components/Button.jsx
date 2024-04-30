export const Button = ({ text, functionFn }) => {
  return (
    <>
      <button
        onClick={functionFn}
        type="button"
        className="rounded-md bg-lightpink px-3 py-2 font-semibold text-white shadow-sm hover:bg-pink duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink text-xl">
        {text}
      </button>
    </>
  )
}

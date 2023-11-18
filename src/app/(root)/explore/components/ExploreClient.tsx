const ExploreBotClient = () => {
  return (
    <>
      <div className="flex justify-center">
        <div className="border-2">
          <span>
            <i className="fa-solid fa-magnifying-glass"></i>
          </span>
          <input
            type="text"
            placeholder="Rechercher des bots ou des personnes"
          />
        </div>
      </div>
    </>
  )
}

export default ExploreBotClient

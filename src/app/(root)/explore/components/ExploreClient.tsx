"use client"
import { useEffect, useState } from "react"
import useDebounce from "@/hooks/debounce/useDebounce"
import { BotService } from "@/service/bot/index.service"
import PostCap from "@/components/displayers/botsCap"
import { ScenarioInterface } from "@/types/lesson/type"
import { Spin } from "antd/lib"
import { AppButton } from "@/components/level1/antd/AppButton"
import { AppInput } from "@/components/level1/antd/AppInput"
import { tagOptions } from "@/components/template/create-scenario"
import { useMounted } from "@/hooks/helpers/use-mounted"

const ExploreBotClient = () => {
  const [searchValue, setSearchValue] = useState("")
  const [searchResult, setSearchResult] = useState<ScenarioInterface[]>([])
  const [page, setPage] = useState(0) // số trang hiện tại
  const [isLoading, setIsLoading] = useState(false) // hiện thị loading gọi api
  const [tagSelected, setTagSelected] = useState("")
  const [reachedEnd, setReachedEnd] = useState(true)

  const debounced = useDebounce(searchValue, 1000)

  const isMounted = useMounted()

  useEffect(() => {
    function handleScroll() {
      const scrollY = window.scrollY || window.pageYOffset
      const clientHeight = document.documentElement.clientHeight
      const scrollHeight = document.documentElement.scrollHeight

      if (scrollY + clientHeight >= scrollHeight - 10) {
        console.log("đã đến trang 2")
        if (!reachedEnd && !isLoading) {
          setPage(page + 1)
        }
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reachedEnd])

  const onSearch = async () => {
    if (isLoading) {
      return
    }
    setIsLoading(page < 1)
    const result = await BotService.get({
      name: debounced,
      limit: 5,
      offset: page * 5,
      tag: tagSelected,
    })
    setIsLoading(false)
    setReachedEnd(result.data.length < 1)

    if (page === 0) {
      setSearchResult(result.data)
      return
    }

    setSearchResult([...searchResult, ...result.data])
  }

  useEffect(() => {
    onSearch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced, page, tagSelected])

  const handleChange = (e: any) => {
    const searchValueConten = e.target.value
    setSearchValue(searchValueConten)
  }
  const handleOnClick = (tagOption: string) => {
    setTagSelected(tagOption)
    setPage(0)
  }

  if (!isMounted) {
    return null
  }

  return (
    <>
      <div className="container max-w-2xl my-0 mx-auto p-3">
        <div className="flex justify-center flex-col mt-[20px]">
          <AppInput
            value={searchValue}
            onChange={handleChange}
            spellCheck={false}
            prefix={<i className="fa-regular fa-search text-sm"></i>}
            placeholder="Search"
            required
          />

          <div className="mt-3 flex gap-2 max-h-[72px] flex-wrap w-full overflow-auto no-scrollbar">
            <AppButton
              size="middle"
              onClick={() => handleOnClick("")}
              type={tagSelected ? "default" : "primary"}
            >
              All
            </AppButton>

            {tagOptions?.map((tagOption, index) => (
              <AppButton
                key={index}
                size="middle"
                onClick={() => handleOnClick(tagOption)}
                type={tagSelected !== tagOption ? "default" : "primary"}
              >
                {tagOption}
              </AppButton>
            ))}
          </div>

          <div className="mt-3">
            {isLoading ? (
              <div className="text-center">
                <Spin />
              </div>
            ) : (
              searchResult?.map((bot) => <PostCap key={bot.id} bot={bot} />)
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default ExploreBotClient

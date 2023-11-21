"use client"
import { Button } from "antd"
import { tagOptions } from "../../create/components/CreateClient"
import { useEffect, useState } from "react"
import useDebounce from "@/hooks/debounce/useDebounce"
import { BotService } from "@/service/bot/index.service"
import PostCap from "@/components/displayers/botsCap"
import { ILesson } from "@/types/lesson/type"

const ExploreBotClient = () => {
  const [searchValue, setSearchValue] = useState("")
  const [searchResult, setSearchResult] = useState<ILesson[]>([])
  const [page, setPage] = useState(0) // số trang hiện tại
  const [isLoading, setIsLoading] = useState(false) // hiện thị loading gọi api
  const [reachedEnd, setReachedEnd] = useState(true) // kiểm tra xem người dùng scroll đến cuối trang chưa
  // dùng state để theo dõi trạng thái của nút
  const [tagSelected, setTagSelected] = useState("")
  //khi người nhập dừng 3000ms thì giá trị debounced được updete bằng giá trị mới nhất của searchValue
  const debounced = useDebounce(searchValue, 3000)

  useEffect(() => {
    function handleScroll() {
      // console.log("handleScroll")
      const scrollY = window.scrollY || window.pageYOffset // scrollY vị trí cuộn
      const clientHeight = document.documentElement.clientHeight //clientHeight là kích thước màn hình
      const scrollHeight = document.documentElement.scrollHeight // scrollHeight là chiều cao trang

      if (scrollY + clientHeight >= scrollHeight - 10) {
        // Khi người dùng scroll đến cuối trang và reachedEnd chưa đc đánh dấu thì
        // console.log("đã đến trang 2")
        if (reachedEnd === false) {
          setPage(page + 1)
          // Nếu chưa đến cuối trang (để tránh gọi API nhiều lần)
        }
      }
    }
    // đăng kí sự kiện cuộn
    window.addEventListener("scroll", handleScroll)
    // loại bỏ nó khi component bị huỷ
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [reachedEnd, page])

  useEffect(() => {
    onSearch(debounced)
    console.log("tagSelected", tagSelected)
  }, [debounced, page, tagSelected])

  const onSearch = async (debounce: string) => {
    setReachedEnd(true) // setReachedEnd(true) để người dùng scroll đến cuối k gọi api
    const result = await BotService.get({
      // truyền name, limit offset vào để tính số trang, ngắt trang
      name: debounce,
      limit: 5,
      offset: page * 5,
      tag: tagSelected,
    })

    if (result.data.length > 0) {
      // nếu độ dài result lớn hơn 0 thì
      setReachedEnd(false) // gọi tiếp api của trang 2
      setSearchResult([...searchResult, ...result.data]) // cập nhật trạng thái reachedEnd nếu đã hết dữ liệu
    } else {
      setReachedEnd(true) // độ dài nhỏ bằng 0 thì sẽ k gọi api
    }
    // console.log("result", result.data)
  }

  const handleChange = (e: any) => {
    const searchValueConten = e.target.value
    // console.log(searchValueConten)

    setSearchValue(searchValueConten)
  }
  const handleOnClick = (tagOption: string) => {
    // đảo ngược trạng thái của nút
    // console.log("tagOption", tagOption)
    setTagSelected(tagOption)
    setPage(0)
    setSearchResult([])
  }
  // màu nền của nút sẽ thay đổi dựa vào trạng thái nút

  return (
    <>
      <div className="flex justify-center flex-col mt-[20px]">
        <form className="w-[768px]">
          <div className="relative w-[768px]">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              value={searchValue}
              onChange={handleChange}
              spellCheck={false}
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Mockups, Logos..."
              required
            />
          </div>
        </form>

        <div className="mt-3 flex gap-2">
          {/* Thêm nội dung bạn muốn hiển thị */}
          {tagOptions?.map((tagOption, index) => (
            <div key={index}>
              <Button
                onClick={() => handleOnClick(tagOption)}
                className={
                  tagSelected === tagOption ? "bg-blue-500 text-white" : ""
                }
              >
                {tagOption}
              </Button>
            </div>
          ))}
        </div>
        <div>
          {searchResult?.map((bot) => (
            <PostCap key={bot.id} bot={bot} />
          ))}
        </div>
      </div>
    </>
  )
}

export default ExploreBotClient

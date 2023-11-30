"use client"
import { Button } from "antd"
import { tagOptions } from "../../create/components/CreateClient"
import { useEffect, useState } from "react"
import useDebounce from "@/hooks/debounce/useDebounce"
import { BotService } from "@/service/bot/index.service"
import PostCap from "@/components/displayers/botsCap"
import { ILesson } from "@/types/lesson/type"
import { Spin } from "antd/lib"
import { AppButton } from "@/components/level1/antd/AppButton"
import { AppInput } from "@/components/level1/antd/AppInput"

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
        // rearchEnd là status để xác định xem còn dữ liệu để lấy hay k, bằng false vẫn còn trang kế tiếp
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
  }, [debounced, page, tagSelected])

  const onSearch = async (debounce: string) => {
    if (isLoading) {
      return
    }
    setIsLoading(true)
    setReachedEnd(true) // setReachedEnd(true) để người dùng scroll đến cuối k gọi api
    const result = await BotService.get({
      // truyền name, limit offset vào để tính số trang, ngắt trang
      name: debounce,
      limit: 5,
      offset: page * 5,
      tag: tagSelected,
    })

    // nếu page = 0 thì tức là mới bắt đầu tìm kiếm, k phải đang scroll nên k cần nối
    if (page === 0) {
      setSearchResult(result.data) // setSearchResult là mảng mới khi đã tìm kiếm
    } else {
      //
      if (result.data.length > 0) {
        // nếu độ dài result lớn hơn 0 thì
        setReachedEnd(false) // xác định rằng vẫn chưa lấy hết dữ liệu vẫn có thể gọi đc trang kê tiếp
        setSearchResult([...searchResult, ...result.data]) //nối dữ liệu cũ với dữ liệu trang mới dể hiện thị ra màn hình
      } else {
        setReachedEnd(true) // xét bằng true đã lấy hết dữ liệu k còn trang kế tiếp
      }
    }

    setIsLoading(false)
    // console.log("result", result.data)
  }

  // console.log("searchResult", searchResult)
  const handleChange = (e: any) => {
    const searchValueConten = e.target.value
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
      <div className="container max-w-2xl my-0 mx-auto p-3">
        <div className="flex justify-center flex-col mt-[20px]">
          <AppInput
            value={searchValue}
            onChange={handleChange}
            spellCheck={false}
            prefix={<i className="fa-regular fa-search"></i>}
            placeholder="Search"
            required
          />

          <div className="mt-3 flex gap-2 max-h-[72px] flex-wrap w-full overflow-auto no-scrollbar">
            <AppButton
              size="middle"
              onClick={() => handleOnClick("")}
              type={!tagSelected ? "default" : "primary"}
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

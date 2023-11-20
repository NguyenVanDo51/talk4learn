"use client"
import { Button } from "antd"
import { tagOptions } from "../../create/components/CreateClient"
import { useEffect, useRef, useState } from "react"
import useDebounce from "@/hooks/debounce/useDebounce"

const ExploreBotClient = () => {
  const [searchValue, setSearchValue] = useState("")
  const [searchResult, setSearchResult] = useState([])
  const debounced = useDebounce(searchValue, 3000)

  useEffect(() => {
    if (!debounced.trim()) {
      setSearchResult([])
      return
    }

    console.log(debounced)
  }, [debounced])

  const handleChange = (e) => {
    const searchValueConten = e.target.value
    console.log(searchValueConten)

    setSearchValue(searchValueConten)
  }
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
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              value={searchValue}
              onChange={handleChange}
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Mockups, Logos..."
              required
            />
          </div>
        </form>
        {
          <div className="mt-3 flex gap-2">
            {/* Thêm nội dung bạn muốn hiển thị */}
            {tagOptions?.map((tagOption, index) => (
              <div key={index}>
                <Button className="">{tagOption}</Button>
              </div>
            ))}
          </div>
        }
      </div>
    </>
  )
}

export default ExploreBotClient

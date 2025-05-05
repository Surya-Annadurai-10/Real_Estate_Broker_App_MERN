import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Cards from "../Components/Cards";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";


const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const value = searchParams.get("searchTerm");
  const offer = searchParams.get("offer");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredValue, setFilteredValue] = useState([]);
  const navigate = useNavigate();
  const [showMore, setShowMore] = useState(false);
  const [showSort ,setShowSort] = useState(false);
  const [searchQuery, setSearchQuery] = useState({
    searchTerm: "",
    type: "all",
    offer: false,
    parking: false,
    furnished: false,
    sort: "createdAt",
    order: "desc",
  });
  console.log(searchQuery, "searchQuery");
  // console.log(filteredValue, "filteredValue");

  const handleChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id == "rent" ||
      e.target.id == "sale"
    ) {
      setSearchQuery({
        ...searchQuery,
        [e.target.name]: e.target.id,
      });
    }

    if (
      e.target.id == "offer" ||
      e.target.id == "parking" ||
      e.target.id == "furnished"
    ) {
      setSearchQuery({
        ...searchQuery,
        [e.target.id]: e.target.checked,
      });
    }

    if (e.target.id == "searchTerm") {
      setSearchQuery({
        ...searchQuery,
        [e.target.id]: e.target.value,
      });
    }

    if (e.target.name == "sort") {
      const order = e.target.value.split("_")[1];
      const sort = e.target.value.split("_")[0];

      setSearchQuery({
        ...searchQuery,
        order,
        sort,
      });

      // console.log(order, sort, "order sort");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowSort(false)
    //  searchTerm: "",
    //  type: "all",
    //  offer: "",
    //  parking: "",
    //  furnished: "",
    //  sort: "createdAt",
    //  order: "desc",
    // console.log("hellow");

    const urlParams = new URLSearchParams(window.location.search);

    urlParams.set("searchTerm", searchQuery.searchTerm);
    urlParams.set("type", searchQuery.type);
    urlParams.set("offer", searchQuery.offer);
    urlParams.set("parking", searchQuery.parking);
    urlParams.set("furnished", searchQuery.furnished);
    urlParams.set("sort", searchQuery.sort);
    urlParams.set("order", searchQuery.order);
    const searchParams = urlParams.toString();
    navigate(`/search/?${searchParams}`);

    // console.log(`/api/listing/search?${searchParams}`, "searchParams");

    try {
      const res = await fetch(`/api/listing/search?${searchParams}`);
      const resData = await res.json();
      // console.log(resData, "resData");
      if (!resData.success) {
        console.log(res.message, "error");
      } else {
        setFilteredValue(resData.listings);
        // console.log(res.message, "success");
      }
    } catch (error) {
      console.log("Error while fetching the data ", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      

      try {
        const res = await fetch(`/api/listing/search?${searchParams}`);
        const resData = await res.json();
        // console.log(resData, "resData");
        if (!resData.success) {
          console.log(res.message, "error");
        } else {
          setFilteredValue(resData.listings);
          if(resData.listings.length == 0){
            setShowMore(false);
          }else{
             setShowMore(true)
          }
         
        }
      } catch (error) {
        console.log("Error while fetching the data ", error);
      }
    };

    fetchData();
  }, [searchQuery]);

  const handleShowMore = async () => {
    const index = filteredValue.length;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", index);
    const searchQueryParams = urlParams.toString();

    try {
      const res = await fetch(`/api/listing/search?${searchQueryParams}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const resData = await res.json();
      console.log(resData, " resData");
      

      if (resData.success) {
        if(resData.listings.length == 0){
          setShowMore(false);
        }else{
           setShowMore(true)
        }
        setFilteredValue([...filteredValue, ...resData.listings]);
      } else {
        console.log(resData.message, "Error while fetching the data");
      }
    } catch (error) {}
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);

   

    const searchTermUrl = urlParams.get("searchTerm");
    const typeUrl = urlParams.get("type");
    const offerUrl = urlParams.get("offer");
    const parkingurl = urlParams.get("parking");
    const furnishedUrl = urlParams.get("furnished");
    const sortUrl = urlParams.get("sort");
    const orderUrl = urlParams.get("order");
   

    console.log(
      {
        searchTermUrl,
        typeUrl,
        offerUrl,
        parkingurl,
        furnishedUrl,
        sortUrl,
        orderUrl,
      },
      "fetchedUrl"
    );

    if (
      searchTermUrl ||
      typeUrl ||
      offerUrl ||
      parkingurl ||
      furnishedUrl ||
      sortUrl ||
      orderUrl
    ) {
      setSearchQuery({
        searchTerm: searchTermUrl || "",
        type: typeUrl || "all",
        offer: offerUrl == "true" ? true : false,
        parking: parkingurl == "true" ? true : false,
        furnished: furnishedUrl == "true" ? true : false,
        sort: sortUrl || "createdAt",
        order: orderUrl || "desc",
      });
    }
  }, [location.search]);

  

  return (
    <>
      <main className="flex items-start bg-[#F1F5F1] justify-center">
        <form
          onSubmit={handleSubmit}
          className={`w-[400px] ${showSort ? "left-0" : "right-[99%]"} lg:left-0 lg:relative  absolute backdrop-blur-2xl flex items-center justify-start flex-col gap-4 py-4 min-h-[90vh]`}>
          <HiAdjustmentsHorizontal onClick={() => setShowSort(!showSort)} className="absolute cursor-pointer lg:hidden top-4 left-[100%] bg-slate-700 rounded-full text-white text-[2.5rem] p-2"/>
          <div className="flex  items-center justify-center gap-2">
            <label className="font-semibold" htmlFor="search">
              Search Term :
            </label>
            <input
              onChange={handleChange}
              value={searchQuery.searchTerm}
              id="searchTerm"
              className="w-[62%] bg-white outline-none border border-gray-400 h-[40px] rounded-md"
              type="text"
            />
          </div>

          <div className="flex  item-center justify-center gap-2">
            <h1 className="font-semibold">Type: </h1>
            <div className="flex  item-center justify-center gap-1">
              <input
                onChange={handleChange}
                checked={searchQuery.type == "all"}
                className="w-5"
                name="type"
                id="all"
                type="checkbox"
              />
              <label htmlFor="all">Rent & Sale</label>
            </div>
            <div className="flex  item-center justify-center gap-1">
              <input
                onChange={handleChange}
                checked={searchQuery.type == "rent"}
                className="w-5"
                name="type"
                id="rent"
                type="checkbox"
              />
              <label htmlFor="rent">Rent</label>
            </div>
            <div className="flex  item-center justify-center gap-1">
              <input
                onChange={handleChange}
                checked={searchQuery.type == "sale"}
                className="w-5"
                id="sale"
                name="type"
                type="checkbox"
              />
              <label htmlFor="sale">Sale</label>
            </div>
            <div className="flex  item-center justify-center gap-1">
              <input
                onChange={handleChange}
                checked={searchQuery.offer}
                className="w-5"
                id="offer"
                name="offer"
                type="checkbox"
              />
              <label htmlFor="offer">Offer</label>
            </div>
          </div>
          <div className="flex item-center justify-center gap-2">
            <h1 className="font-semibold">Amenities: </h1>
            <div className="flex  item-center justify-center gap-1">
              <input
                className="w-5"
                name="parking"
                id="parking"
                onChange={handleChange}
                checked={searchQuery.parking}
                type="checkbox"
              />
              <label htmlFor="parking">Parking</label>
            </div>
            <div className="flex  item-center justify-center gap-1">
              <input
                className="w-5"
                name="furnished"
                id="furnished"
                onChange={handleChange}
                checked={searchQuery.furnished}
                type="checkbox"
              />
              <label htmlFor="furnished">Furnished</label>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <h1 className="font-semibold">Sort :</h1>
            <select
              onChange={handleChange}
              className="w-[150px] outline-none rounded-md h-[40px] border border-gray-300 bg-white p-2"
              name="sort"
              id="sort"
            >
              <option value="createdAt_desc">Latest</option>
              <option value="regularPrice_asc">Price Low to High</option>
              <option value="regularPrice_desc">Price High to Low</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>
          <button className="w-[90%] h-[40px] active:scale-[0.95] hover:bg-slate-600 hover:scale-[1.03] transition-all cursor-pointer bg-slate-700 rounded-md uppercase text-white">
            Search
          </button>
        </form>

        <div className="lg:w-[75%] w-[86%] border-l-1 border-l-[#dcdada] bg-[#F1F5F1] p-4  min-h-[90vh]">
          <h1 className="font-semibold text-2xl py-4">Lisiting Results :</h1>
          <div className=" flex items-center justify-start flex-wrap gap-8 border-t-1 py-5 border-t-[#dcdada]">
            {filteredValue.length > 0 ? (
              <>
                {filteredValue.map((ele, i) => {
                  return <Cards key={ele._id} {...ele} />;
                })}
              </>
            ) : (
              <h1>No Listing Found!!</h1>
            )}
          </div>
          <div className="w-full grid place-items-center">
            {showMore ? (
              <button
                onClick={handleShowMore}
                className="px-4 py-2 active:scale-[0.95] hover:scale-[1.05] hover:bg-green-500 hover:shadow-green-300 transition-all cursor-pointer rounded-md  text-white bg-green-600 mx-auto"
              >
                Show More
              </button>
            ) : null}
          </div>
        </div>
      </main>
    </>
  );
};

export default SearchPage;

import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import React, { useEffect, useRef, useState } from "react";
import { storage } from "../fireBase";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreateListing = () => {
  const [fileCount, setFileCount] = useState(0);
  const [files, setFiles] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [uploadingError, setUploadingError] = useState("");
  const [uploadingStatus, setUploadingStatus] = useState("");
  const [deleteStatus, setDeleteStatus] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);
  const fileRef = useRef(null);
  const stateUser = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    type: "",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 0,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
    latitude: 1,
    longitude: 1,
    imageURLs: [...imageURLs],
    userRef: stateUser.userData._id,
  });
  console.log(formData, "formData");
  console.log(imageURLs, "imageURLs");
  console.log(stateUser, "stateUser");

  const handleChange = (e) => {
    if (
      e.target.name == "parking" ||
      e.target.name == "furnished" ||
      e.target.name == "offer"
    ) {
      setFormData({
        ...formData,
        imageURLs: [...imageURLs],
        [e.target.name]: e.target.checked,
      });
    } else if (e.target.name == "bedrooms" || e.target.name == "bathrooms") {
      setFormData({
        ...formData,
        imageURLs: [...imageURLs],
        [e.target.name]: parseInt(e.target.value),
      });
    } else if (
      e.target.name == "regularPrice" ||
      e.target.name == "discountPrice"
    ) {
      setFormData({
        ...formData,
        imageURLs: [...imageURLs],
        [e.target.name]: parseInt(e.target.value),
      });
    } else {
      setFormData({
        ...formData,
        imageURLs: [...imageURLs],
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleCreateListing = async () => {
    if (imageURLs.length < 1)
      return setUploadingError("Must upload atleast one image");
    if (+formData.regularPrice < +formData.discountPrice)
      return setUploadingError(
        "Discount Price must be lower than the regular price!"
      );
    try {
      setUploadingError("");
      setUploadingStatus("");
      setDeleteLoading("");
      setDeleteStatus("");
      setCreating(true);
      const res = await fetch("/api/listing/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const resData = await res.json();

      if(resData.success == false){
        setUploadingError(resData.message)
        return;
      }
      console.log(resData, "resData");
      setCreating(false);
      navigate(`/listing/${resData.data.userRef}`)
    } catch (error) {
      setUploadingError("Error while uploading in db", error);
    }
  };

  // console.log(files, "files");
  const handleFileChange = (e) => {
    setUploadingError("");
    setFileCount((prev) => prev + e.target.files.length);
    let filesObj = Object.values(e.target.files);
    // console.log(filesObj, "files");
    setFiles([...files, ...filesObj]);
  };

  const handleUpload = async () => {
    setDeleteStatus("");
    setDeleteLoading("");
    if (files.length > 0 && files.length < 7) {
      setUploading(true);
      setUploadingError("");
      const promises = [];
      files.map((ele, i) => {
        promises.push(getImageUrl(ele, i));
      });

      try {
        await Promise.all(promises)
          .then((url) => {
            console.log(url, "urlObj");

            setImageURLs([...imageURLs, ...url]);
            setFormData({
              ...formData,
              imageURLs: [...imageURLs, ...url],
            });
          })
          .catch((err) => {
            console.log(err, "Err while resolving the image upload promise");
            setUploadingError(err);
          });
      } catch (error) {
        setUploadingError(error);
      }
      setUploadingStatus("All images uploaded successfully");
      fileRef.current.value = "";
      setFileCount(0);
      setFiles([]);
      // console.log(imageURLs, "imageURLs");
      setUploading(false);
    } else {
      setUploadingError("Max 6 images only allowed");
      fileRef.current.value = "";
      setFileCount(0);
    }
  };

  const getImageUrl = async (file, i) => {
    return new Promise((resolve, reject) => {
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, `listingImages/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadingStatus(
            `image : ${i + 1} - uploading ${Math.round(progress)}% completed`
          );
        },
        (err) => {
          setUploadingError(
            err,
            "Error while uploading the image into firebase"
          );
          reject(err);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((url) => {
              console.log(url, "urls");
              resolve({
                fileName: file.name,
                url: url,
                storeFileName: fileName,
              });
            })
            .catch((err) => {
              reject(err);
            });
        }
      );
    });
  };

  const handleDeleteImage = async (file, i) => {
    setDeleteLoading(true);
    setUploadingStatus("");
    setDeleteStatus("");
    //  console.log(file , "filename to delete");
    const fileImageRef = ref(storage, `listingImages/${file}`);

    deleteObject(fileImageRef)
      .then(() => {
        console.log("Image deleted successfully !!");

        let copy = [...imageURLs];

        copy.splice(i, 1);
        setImageURLs(copy);

        setDeleteLoading(false);
        setDeleteStatus("Image Deleted successfully!!");
      })
      .catch((err) => {
        setDeleteLoading(false);
        setDeleteStatus(err);
        console.log("Error occured while deleting the file", err);
      });

    //  try {
    //   await deleteObject(fileImageRef);
    //
    //  } catch (error) {
    //   console.log("error while deleting the file",error  );

    //   //
    //  }
  };

  return (
    <main className="bg-[#F1F5F1] h-[90vh] w-full">
      <div className="w-[95%] mx-auto  h-full">
        <h1 className="font-bold text-center text-2xl py-5">Create Listing</h1>
        <div className="flex items-start justify-center gap-2">
          <div className="w-[34%] h-full ">
            <div className="w-[100%] border mb-4 border-[#d4d4d4] h-[50px] bg-white rounded-md">
              <input
                className="w-full outline-none h-full px-2"
                type="text"
                placeholder="Name"
                name="name"
                value={formData.name}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="w-full border  mb-4 rounded-md border-[#dcdcdc] bg-white min-h-[70px]">
              <textarea
                className="w-full outline-none min-h-[70px] p-2"
                placeholder="Description"
                name="description"
                value={formData.description}
                onChange={(e) => handleChange(e)}
              ></textarea>
            </div>
            <div className="w-[100%] border   mb-4 border-[#d4d4d4] h-[50px] bg-white rounded-md">
              <input
                className="w-full outline-none h-full px-2"
                type="text"
                placeholder="Address"
                id="address"
                name="address"
                value={formData.address}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="mt-8">
              <div className="flex items-center justify-start gap-3  ">
                <div className="flex gap-1 ">
                  <input
                    className="w-5 outline-none"
                    name="type"
                    id="sell"
                    value={"sale"}
                    type="radio"
                    onChange={(e) => handleChange(e)}
                  />
                  <label htmlFor="sell">Sell</label>
                </div>
                <div className="flex gap-1 ">
                  <input
                    className="w-5 outline-none"
                    name="type"
                    id="rent"
                    value={"rent"}
                    type="radio"
                    onChange={(e) => handleChange(e)}
                  />
                  <label htmlFor="rent">Rent</label>
                </div>
              </div>
              <div></div>
            </div>
            <div className="flex  w-full h-[50px] items-center justify-between">
              <div className="flex  gap-2">
                <input
                  className="w-5 outline-none p-3"
                  name="parking"
                  id="parking spot"
                  type="checkbox"
                  checked={formData.parking == true}
                  onChange={(e) => handleChange(e)}
                />
                <label htmlFor="parking spot">Parking Spot</label>
              </div>
              <div className="flex  gap-2">
                <input
                  className="w-5 outline-none p-3"
                  name="furnished"
                  id="furnished"
                  type="checkbox"
                  checked={formData.furnished}
                  onChange={(e) => handleChange(e)}
                />
                <label htmlFor="furnished">Furnished</label>
              </div>
              <div className="flex  gap-2">
                <input
                  className="w-5 outline-none p-3"
                  name="offer"
                  id="offer"
                  type="checkbox"
                  checked={formData.offer == true}
                  onChange={(e) => handleChange(e)}
                />
                <label htmlFor="offer">Offer</label>
              </div>
            </div>
            <div className="flex my-5 w-[100%]  items-center justify-between">
              <div className="flex w-[50%] gap-2 items-center">
                <input
                  // defaultValue={1}
                  placeholder="0"
                  type="number"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={(e) => handleChange(e)}
                  id="bedrooms"
                  className="w-[100px] outline-none px-2 bg-white border h-[40px] rounded-md border-[#e2e0e0]"
                />
                <label htmlFor="bedrooms">Bedrooms</label>
              </div>
              <div className="flex  w-[50%] gap-2 justify-start items-center">
                <input
                  // defaultValue={1}
                  placeholder="0"
                  type="number"
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={(e) => handleChange(e)}
                  id="bathrooms"
                  className="w-[100px] outline-none px-2 bg-white border h-[40px] rounded-md border-[#e2e0e0]"
                />
                <label htmlFor="bathrooms">Bathrooms</label>
              </div>
            </div>
            <div className="flex my-5 w-[100%] gap-5  items-center justify-between">
              <div className="flex gap-2 w-[47%] items-center">
                <input
                  // defaultValue={1}
                  placeholder="0"
                  type="number"
                  name="latitude"
                  onChange={(e) => handleChange(e)}
                  id="latitude"
                  value={formData.latitude}
                  className="w-[100px] outline-none px-2 bg-white border h-[40px] rounded-md border-[#e2e0e0]"
                />
                <label htmlFor="latitude">Latitude</label>
              </div>
              <div className="flex gap-2 w-[50%] justify-start items-center">
                <input
                  // defaultValue={1}
                  placeholder="0"
                  type="number"
                  name="longitude"
                  onChange={(e) => handleChange(e)}
                  id="longitude"
                  value={formData.longitude}
                  className="w-[100px] outline-none px-2 bg-white border h-[40px] rounded-md border-[#e2e0e0]"
                />
                <label htmlFor="longitude">Longitude</label>
              </div>
            </div>
            <div className="flex w-[100%] items-center justify-between gap-2">
              <div className="flex w-[48%] rounded-md items-center gap-2">
                <input
                  placeholder="$0"
                  className="w-[100px] outline-none rounded-md px-2 h-[40px] bg-white border border-[#d7d7d7]"
                  type="number"
                  name="regularPrice"
                  // value={formData.regularPrice}
                  onChange={(e) => handleChange(e)}
                  id="regular price"
                />
                <label htmlFor="regular price">
                  <p>Regular Price</p>
                  {formData.type == "rent" ? (
                    <p className="text-[10px] text-center">($/Month)</p>
                  ) : null}
                </label>
              </div>
              {formData.offer ? (
                <div className="flex w-[50%] justify-start items-center rounded-md gap-2">
                  <input
                    placeholder="$0"
                    type="number"
                    name="discountPrice"
                    // value={formData.discountPrice}
                    onChange={(e) => handleChange(e)}
                    className="w-[100px] outline-none px-2 rounded-md h-[40px] bg-white border border-[#d7d7d7]"
                    id="discount price"
                  />
                  <label htmlFor="discount price">
                    <p>Discount Price</p>
                    {formData.type == "rent" ? (
                      <p className="text-[10px] text-center">($/Month)</p>
                    ) : null}
                  </label>
                </div>
              ) : null}
            </div>
          </div>
          <div className="w-[33%] px-3 h-full ">
            <p className="pb-4">
              <strong>Images:</strong> The first images will the cover (max 6)
            </p>
            <div className="w-full h-[40px] gap-4 flex items-center ">
              <div className="flex items-center h-full border border-[#d1d1d1]">
                <input
                  accept="image/*"
                  max={6}
                  min={1}
                  type="file"
                  id="fileUpload"
                  hidden
                  multiple
                  onChange={handleFileChange}
                  ref={fileRef}
                />
                <label
                  htmlFor="fileUpload"
                  className="py-[10px] rounded-md px-[20px] bg-[indigo] text-white transition-all inline-block font-[600] cursor-pointer"
                >
                  Choose File
                </label>
              </div>
              <p>{fileCount == 0 ? "No file chosen" : `${fileCount} files`}</p>
              <button
                disabled={uploading}
                // disabled
                onClick={handleUpload}
                className={`border py-2 px-4 ${
                  uploading
                    ? "border-[#8cc88c] text-[#8cc88c]"
                    : "border-[green]"
                } rounded-md text-green `}
              >
                {uploading ? "Uploading..." : "Upload"}
              </button>
            </div>
            {uploadingError ? (
              <p className="text-red-700 text-sm pt-2">{uploadingError}</p>
            ) : null}
            {uploadingStatus ? (
              <p
                className={`text-sm ${
                  uploadingStatus.includes("All")
                    ? "text-green-700"
                    : "text-slate-700"
                } pt-2`}
              >
                {uploadingStatus}
              </p>
            ) : null}
            <button
              disabled={creating || uploading}
              onClick={handleCreateListing}
              to={"/createlisting"}
              className={`w-full my-4 text-center  cursor-pointer active:scale-[0.95] transition-all rounded-xl h-[45px] p-3 font-400 text-white ${
                creating || uploading ? "bg-slate-500 " : "bg-slate-700"
              }`}
            >
              {creating ? "Creating..." : "Create Listing"}
            </button>
            {deleteStatus ? (
              <p className={`text-green-700 text-sm`}>{deleteStatus}</p>
            ) : null}
            {deleteLoading ? (
              <p className={`text-red-700 text-sm`}>Deleting in progress...</p>
            ) : null}
            <div>
              {imageURLs.length > 0 ? (
                <>
                  <div className=" h-[53vh] imageUrl overflow-hidden  overflow-y-scroll">
                    {imageURLs.map((ele, i) => {
                      return (
                        <div
                          key={ele.url}
                          className="w-full mb-3   h-[75px] flex items-center justify-between"
                        >
                          <img
                            className="w-[75px] rounded-xl"
                            src={ele.url}
                            alt="url-image"
                          />
                          <h1 className="text-slate-700 line-clamp-1 px-1 text-center">
                            {ele.fileName}
                          </h1>
                          <button
                            onClick={() =>
                              handleDeleteImage(ele.storeFileName, i)
                            }
                            className="py-2 px-3 rounded-md text-sm bg-red-800 text-white"
                          >
                            Delete
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                <p className="text-slate-700 px-2">No images uploaded..</p>
              )}
            </div>
          </div>
          <div className="w-[33%] h-[80vh] bg-amber-400"></div>
        </div>
      </div>
    </main>
  );
};

export default CreateListing;

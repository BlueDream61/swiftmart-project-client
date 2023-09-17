import SheardBenner from "../../AdminDashRoutes/AddaProduct/SheardBenner";
import { useContext } from "react";
import { AuthContext } from "../../../Components/Provider/Authprovider";
import OrderTableRow from "./OrderTableRow";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import UseBookmarks from "../../../Components/Hooks/UseBookmarks";
import PaymentForm from "./PaymentComponents/PaymentForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_ApiPayment_PK);

const OrderPage = () => {
  const [bookmark, setBookmark] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isIMG, setIMG] = useState(false);
  const [image, setImage] = useState("");
  const { user } = useContext(AuthContext);
  const[id,setID]=useState(null)
  const [price, setPrice] = useState(0);
  const [ProductBookmark, setSgnleBookmark] = useState([]);
  const { bookmarkProducts, isLoading, refetch } = UseBookmarks();

  //Update product===>
  const openModal = (_id) => {
    setIsOpen(true);
    setID(_id);

    fetch(`http://localhost:5000/paymentBookmark/${_id}`)
      .then((res) => res.json())
      .then((data) => {
        setSgnleBookmark(data);
        const total = parseFloat(data?.price).toFixed(2);
        const price = parseFloat(total);
        setPrice(price);
      });
  };

  const closeModal = () => {
    setIsOpen(false);
    setID(null);
  };

  const openIMG = (img) => {
    setImage(img);
    setIMG(true);
  };

  const closeIMG = () => {
    setIMG(false);
  };

  const DeleteProduct = (id) => {
    Swal.fire({
      position: "top-center",
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085dg",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
      customClass: {
        popup: "bg-white border-4 border-gray-300 rounded-lg",
        title: "text-black text-lg font-bold text-center mb-2",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/bookmarkDelete/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            refetch();

            Swal.fire({
              position: "top-center",
              icon: "success",
              title: "Bookmark Removed!!",
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: "bg-white border-4 border-gray-300 rounded-lg",
                title: "text-black text-lg font-bold text-center mb-2",
              },
            });
          });
      }
    });
  };

  useEffect(() => {
    if (user && bookmarkProducts) {
      setBookmark(
        bookmarkProducts?.filter((product) => product.email === user?.email)
      );
    }
  }, [user, bookmarkProducts]);
  return (
    <div>
      <SheardBenner
        name={"BooKMark Product's"}
        subtitle={user?.displayName}
        img={"https://i.ibb.co/7SN0S6z/b2.jpg"}
      ></SheardBenner>
      {user && bookmark ? (
        <div>
          <div className="w-full  bg-white shadow-lg overflow-x-auto">
            <table className=" table table-x  md:table-sm">
              <thead>
                <tr className="text-white bg-gray-900">
                  <th>Product Img</th>
                  <th>Product Name</th>
                  <th>
                    Price <span className="pr-2"></span>
                  </th>
                  <th>
                    Brand <span className="pr-10"></span>
                  </th>
                  <th>Cetegory</th>
                  <th>Subcetegory</th>
                  <th>Size</th>
                  <th>
                    Quantity <span className="pr-2"></span>
                  </th>
                  <th>Pay</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {bookmark?.map((singleProduct, index) => (
                  <OrderTableRow
                    singleProduct={singleProduct}
                    key={singleProduct._id}
                    openModal={openModal}
                    DeleteProduct={DeleteProduct}
                    openIMG={openIMG}
                  ></OrderTableRow>
                ))}
              </tbody>
            </table>
          </div>
          {/* payment-modal */}
          {isOpen && (
            <div className={`modal ${isOpen ? "modal-open" : ""}`}>
              <div className="modal-box ">
                <span className="flex justify-between items-center">
                  <p className="pl-[2%] text-lg md:text-3xl font-semibold ">
                    Write The Amount
                  </p>
                  <button
                    className=" btn  btn-sm md:btn-md btn-square hover:bg-[#11715e]  bg-[#168a73] text-white"
                    onClick={closeModal}
                  >
                    X
                  </button>
                </span>
                <div className=" p-[2%] w-full">
                  <div className="">
                    <div className="form-control">
                      <p>{}</p>
                      <label className="label flex justify-center">
                        <span className="label-text "></span>
                      </label>
                      <Elements stripe={stripePromise}>
                        <PaymentForm
                          price={price}
                          ProductBookmark={ProductBookmark}
                          closeModal={closeModal}
                        ></PaymentForm>
                      </Elements>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {isIMG && (
            <div className={`modal ${isIMG ? "modal-open" : ""}`}>
              <div className="modal-box ">
                <span className="flex justify-between items-center mb-4">
                  <p className="text-lg md:text-3xl font-bold ">
                    Product Image
                  </p>
                  <button
                    className="btn btn-square hover:bg-[#11715e]  bg-[#168a73] text-white"
                    onClick={closeIMG}
                  >
                    X
                  </button>
                </span>

                <img src={image} alt="IMG" className="rounded-lg w-full" />
              </div>
            </div>
          )}
        </div>
      ) : (
        <p className="flex items-center justify-center h-[45dvh] md:h-[60dvh]   text-center ">
          {" "}
          <button className="btn bg-gray-400 text-white">
            <span className="loading loading-spinner"></span>
            loading
          </button>
        </p>
      )}
      {bookmark.length === 0 && (
        <p className="flex items-center justify-center h-[45dvh] md:h-[60dvh]   text-center ">
        {" "}
        <button className="btn bg-gray-400 text-white">
          <span className="loading loading-spinner"></span>
        No Bookmark's
        </button>
      </p>
      )}
    </div>
  );
};

export default OrderPage;

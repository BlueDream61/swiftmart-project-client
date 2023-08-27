import SheardBenner from "../../AdminDashRoutes/AddaProduct/SheardBenner";
import { useContext } from "react";
import { AuthContext } from "../../../Components/Provider/Authprovider";
import OrderTableRow from "./OrderTableRow";
import UseProducts from "../../../Components/Hooks/UseProducts";
import { useState ,useEffect} from "react";
import Swal from "sweetalert2";

const OrderPage = () => {
  const [Adminproducts, setadminProduct] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [id, setID] = useState([]);
  const { user } = useContext(AuthContext);
  const { refetch, products } = UseProducts();

  //Update product===>
  const openModal = (_id) => {
    setIsOpen(true);
    setID(_id);
  };

  const closeModal = () => {
    setIsOpen(false);
    setID(null);
  };

  //update the product details===>
  const updatedData = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const price = parseInt(form.price.value);
    const brand = form.brand.value;
    const Quantity = parseInt(form.Quantity.value);
    const updatedProduct = { name, price, brand, Quantity };

    fetch(`http://localhost:5000/updateProduct/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    })
      .then((res) => res.json())
      .then(() => {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Product Updated",
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: "bg-indigo-50 rounded-lg shadow-md p-3 md:p-8   md:max-w-md",
            title: "text-sm  md:text-2xl text-blue-600 font-semibold mb-4",
            content: "text-gray-700",
          },
        });
        form.reset();
        closeModal();
        refetch();
      });
  };

  const DeleteProduct = (id) => {
    fetch(`http://localhost:5000/deleteProduct/${id}`, {
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
  };

  useEffect(() => {
    if (user && products) {
      setadminProduct(
        products?.filter((product) => product.email === user?.email)
      );
    }
  }, [user, products]);
  return (
    <div>
      <SheardBenner
        name={"BooKMark Product's"}
        subtitle={user?.displayName}
        img={"https://i.ibb.co/7SN0S6z/b2.jpg"}
      ></SheardBenner>
      {user && Adminproducts ? (
        <div>
          <div className="w-full  bg-white shadow-lg overflow-x-auto">
            <table className=" table table-xs  md:table-sm">
              <thead>
                <tr className="text-white bg-gray-900">
                  <th>Product Img</th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Brand</th>
                  <th>Cetegory</th>
                  <th>Subcetegory</th>
                  <th>Pay</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {Adminproducts?.map((singleProduct, index) => (
                  <OrderTableRow
                    singleProduct={singleProduct}
                    key={singleProduct._id}
                    openModal={openModal}
                    DeleteProduct={DeleteProduct}
                  ></OrderTableRow>
                ))}
              </tbody>
            </table>
          </div>
          {/* Edit-modal */}
          {isOpen && (
            <div className={`modal ${isOpen ? "modal-open" : ""}`}>
              <div className="modal-box ">
                <span className="flex justify-between items-center">
                  <p className="pl-[5%] text-lg md:text-3xl font-bold ">
                    UPDATE NOW
                  </p>
                  <button
                    className="btn btn-square hover:bg-[#11715e]  bg-[#168a73] text-white"
                    onClick={closeModal}
                  >
                    X
                  </button>
                </span>
                <form className="md:p-[2%]" onSubmit={updatedData}>
                  <div className="md:flex gap-2 ">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text ">Name</span>
                      </label>
                      <input
                        type="text"
                        placeholder="product name"
                        required
                        name="name"
                        className="input input-bordered"
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Price</span>
                      </label>
                      <input
                        type="number"
                        placeholder="Price"
                        required
                        name="price"
                        className="input input-bordered"
                      />
                    </div>
                  </div>
                  <div className="md:flex gap-2 ">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text ">Brand</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Brand name"
                        required
                        name="brand"
                        className="input input-bordered"
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Quantity</span>
                      </label>
                      <input
                        type="number"
                        placeholder="Quantity"
                        required
                        name="Quantity"
                        className="input input-bordered"
                      />
                    </div>
                  </div>
                  <div className="form-control mt-6">
                    <button class="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-[#11715e] rounded-full shadow-md group">
                      <span class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-[#11715e] group-hover:translate-x-0 ease">
                        <svg
                          class="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          ></path>
                        </svg>
                      </span>
                      <span class="absolute flex items-center justify-center w-full h-full text-[#11715e] transition-all duration-300 transform group-hover:translate-x-full ease">
                        UPDATE
                      </span>
                      <span class="relative invisible ">UPDATE</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      ) : (
        <p className="text-[100px] mt-[100px] mb-[200px]   text-center text-red-700 ">
          {" "}
          <span className="loading loading-bars loading-lg"></span>
        </p>
      )}
      {!products && <p>You Don't Add any Product</p>}
    </div>
  );
};

export default OrderPage;

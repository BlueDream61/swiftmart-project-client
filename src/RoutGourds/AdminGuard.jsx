import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { AuthContext } from "../Components/Provider/Authprovider";
import UseUsers from "../Components/Hooks/UseUsers";

const MySwal = withReactContent(Swal);


const AdminGuard = ({ children }) => {

  const { loading, user } = useContext(AuthContext);
  const {allUsers}=UseUsers()
  const navigate = useNavigate();

  const activeUserEmail = user?.email;
  const DBUser = allUsers?.find((signleuser) => signleuser?.email === activeUserEmail);

  if (loading) {
    return (
      <p className="flex items-center justify-center h-[50dvh] md:h-[80dvh] text-center ">
        {" "}
        <button className="btn bg-gray-400 text-white">
          <span className="loading loading-spinner"></span>
          loading
        </button>
      </p>
    );
  }

  if (!user) {
    MySwal.fire({
      title: "Please Login First!",
      text: "Do you want to go to the Login Page?",
      icon: "warning",
      showCancelButton: false,
      confirmButtonText: "Yes, Login",
      confirmButtonColor: "#3085d6",
      customClass: {
        container: "swal-container",
        title: "swal-title",
        text: "swal-text",
        confirmButton: "swal-button swal-button--confirm",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/");
      }
    });

    return null;
  }

  if (!DBUser) {
   return (
     <p className="flex items-center justify-center h-[50dvh] md:h-[80dvh] text-center ">
       {" "}
       <button className="btn bg-gray-400 text-white">
         <span className="loading loading-spinner"></span>
         loading
       </button>
     </p>
   );
 }
  if ( DBUser?.role === "admin") {
    return children;
  }
  
};

export default AdminGuard;

import { FaUsers } from "react-icons/fa";
import { GrUserAdmin } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";
import useAxios from "../../../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

const Users = () => {
  const axiosSecure = useAxios();
  const {isPending, data: users = []} = useQuery({
    queryKey:["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    }
  })
  isPending && <div>Loading...</div>
  console.log(users);

  return (
    <main className="p-4 md:p-8 lg:p-10 my-16 mx-4 md:mx-10 lg:mx-20 bg-[var(--clr-light-primary)] rounded-lg space-y-4">
      <h4>Total Users: {users.length}</h4>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="bg-[var(--clr-focused)] text-white text-base uppercase">
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Role </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <div
                    className="bg-[var(--clr-focused)] rounded-sm p-2 text-white w-fit mx-auto cursor-pointer"
                  >
                    {
                      user.role === "admin" ? <GrUserAdmin title="Admin"></GrUserAdmin> : 
                    <FaUsers title="User"></FaUsers>
                    }
                  </div>
                </td>
                <td>
                  <button
                    className="bg-red-700 rounded-sm p-2 text-white flex mx-auto"
                  >
                    <RiDeleteBin6Line />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default Users;
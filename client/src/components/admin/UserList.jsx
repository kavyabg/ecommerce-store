import { useUserList } from "../../hooks/admin/useUserList";

const UserList = () => {
  const { users, loading, error } = useUserList();

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">User Management</h1>

        {loading && <p>Loading users...</p>}
        {error && <p className="text-red-600">{error}</p>}

        {!loading && !error && (
          <div className="overflow-x-auto bg-white shadow-md rounded-xl">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-100 text-gray-700 text-sm">
                <tr>
                  <th className="p-3">#</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Phone</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="p-3 text-center">
                      No users available.
                    </td>
                  </tr>
                ) : (
                  users.map((user, i) => (
                    <tr
                      key={user._id || i}
                      className="border-t hover:bg-gray-50 transition-all text-gray-800"
                    >
                      <td className="p-3">{i + 1}</td>
                      <td className="p-3">{user.username}</td>
                      <td className="p-3">{user.email}</td>
                      <td className="p-3">{user.phone}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
    </div>
  );
};

export default UserList;

import { useUserList } from "../../hooks/admin/useUserList";

const UserList = () => {
  const { users, loading, error } = useUserList();

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">User Management</h1>

      <div className="bg-white p-6 rounded-xl shadow-lg">
        {loading && <p>Loading users...</p>}
        {error && <p className="text-red-600">{error}</p>}

        {!loading && !error && (
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-sm">
                <th className="p-3">#</th>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Phone</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => (
                <tr
                  key={user._id || i}
                  className="hover:bg-blue-100 transition-all text-gray-800"
                >
                  <td className="p-3">{i + 1}</td>
                  <td className="p-3">{user.username}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UserList;

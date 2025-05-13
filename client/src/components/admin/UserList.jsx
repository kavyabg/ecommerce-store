// src/admin/pages/UserList.jsx
const UserList = () => {
  const users = [
    { id: 1, name: "Alice Johnson", email: "alice@example.com" },
    { id: 2, name: "Bob Smith", email: "bob@example.com" },
    { id: 3, name: "Charlie Lee", email: "charlie@example.com" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">User Management</h1>

      <div className="bg-white p-6 rounded-xl shadow-lg">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-sm">
              <th className="p-3">#</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr
                key={user.id}
                className="hover:bg-blue-100 transition-all text-gray-800"
              >
                <td className="p-3">{i + 1}</td>
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;

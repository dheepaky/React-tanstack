import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { MdDelete, MdCancelPresentation } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useState } from "react";
import backendUrl from "./Const";

export default function Home() {
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ name: "", description: "" });

  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["userdata"],
    queryFn: async () => {
      const res = await fetch(`${backendUrl}/view`);
      if (!res.ok) {
        throw new Error("Failed to fetch user data");
      }
      return res.json();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      // Corrected to return the promise from the axios call
      return await axios.delete(`${backendUrl}/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userdata"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }) => {
      // Corrected to pass the data payload
      return await axios.put(`${backendUrl}/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userdata"] });
      setEditId(null);
    },
  });

  // UI state handling
  if (isLoading) {
    return (
      <p className="flex justify-center gap-5 mt-10 text-xl">Loading...</p>
    );
  }

  if (error) {
    return <p>Error fetching data</p>;
  }

  const handleDelete = (id) => {
    const confirmed = window.confirm("Do you really want to delete this user?");
    if (confirmed) {
      deleteMutation.mutate(id);
    }
  };

  const handleUpdate = (id) => {
    // Corrected to pass the id and data as an object
    updateMutation.mutate({ id, data: editData });
  };

  const handleEditClick = (userdata) => {
    setEditId(userdata._id);
    setEditData({ name: userdata.name, description: userdata.description });
  };

  const handleCancelClick = () => {
    setEditId(null);
    setEditData({ name: "", description: "" });
  };

  return (
    <div className="page home-page">
      <div>
        <h1 className="text-center text-blue-700 text-3xl mt-5">User Data</h1>
      </div>

      <div className="flex flex-col justify-center gap-5 mt-10 text-xl items-center ">
        {data.length === 0 && <p>No Data available Here</p>}
        {data.map((userdata) => {
          return (
            <div key={userdata._id} className="flex gap-5 items-center">
              {editId === userdata._id ? (
                // Edit mode
                <div className="shadow-[1px_1px_9px_1px] rounded-xl shadow-green-300 border border-green-400 p-4 w-fit text-blue-900">
                  <h1>ID : {userdata._id}</h1>
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) =>
                      setEditData({ ...editData, name: e.target.value })
                    }
                    className="border-2 border-black m-1 px-2"
                  />
                  <input
                    type="text"
                    value={editData.description}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        description: e.target.value,
                      })
                    }
                    className="border-2 border-black m-1 px-2"
                  />
                  <div className="flex gap-5 items-center ">
                    <button
                      onClick={() => handleUpdate(userdata._id)}
                      className="bg-blue-500 text-white px-2 py-1 mt-2 block cursor-pointer"
                      disabled={updateMutation.isPending}>
                      {updateMutation.isPending ? "Saving..." : "Save"}
                    </button>
                    <button onClick={handleCancelClick}>
                      <MdCancelPresentation className="h-10 mt-2 w-10 text-red-600 cursor-pointer" />
                    </button>
                  </div>
                </div>
              ) : (
                // View mode
                <>
                  <p
                    className="text-blue-500 cursor-pointer"
                    onClick={() => handleEditClick(userdata)}>
                    <FaEdit className="h-8 w-8" />
                  </p>
                  <div className="shadow-[1px_1px_9px_1px] rounded-xl shadow-green-300 border border-green-400 p-4 w-fit text-blue-900">
                    <h1>id : {userdata._id}</h1>
                    <h1>Name : {userdata.name}</h1>
                    <h2>Description : {userdata.description}</h2>
                  </div>
                  <div>
                    <p
                      className="text-red-600 cursor-pointer mt-2"
                      onClick={() => handleDelete(userdata._id)}>
                      <MdDelete className="h-8 w-8" />
                    </p>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

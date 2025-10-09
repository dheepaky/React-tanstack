import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import backendUrl from "./Const";

export default function Create() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const queryClient = useQueryClient();

  // const backendurl = import.meta.env.VITE_BACKEND_URL;

  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: (newData) => {
      // simulate network delay
      return new Promise((resolve) => {
        setTimeout(async () => {
          const res = await axios.post(`${backendUrl}/create`, newData);
          resolve(res);
        }, 2000);
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userdata"] });
      setName("");
      setDescription("");
      navigate("/");
    },

    onError: () => console.log("Mutation failed"),
  });

  const handleCreate = (e) => {
    e.preventDefault();
    mutate({ name, description });
  };

  return (
    <div className="page create-page">
      <div className="mt-10">
        <h1 className="text-center text-3xl text-blue-700 mb-5">Create User</h1>
        <form
          onSubmit={handleCreate}
          className="flex flex-col gap-4 w-fit mx-auto">
          <input
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded w-80"
            required
          />
          <input
            type="text"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 rounded w-80"
            required
          />

          <button
            type="submit"
            className="cursor-pointer flex items-center justify-center gap-2 border-2 px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50">
            {isPending ? "Saving..." : "Submit"}
          </button>

          {isError && <p className="text-red-600 mt-2">Error!</p>}
          {isSuccess && <p className="text-green-600 mt-2">Saved!</p>}
        </form>
      </div>
    </div>
  );
}

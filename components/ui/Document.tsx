'use client';

import { FormEvent, useEffect, useState, useTransition } from "react";
import { Input } from "./input";
import { Button } from "./button";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";
import Editor from "../Editor";
import useOwner from "@/lib/useOwner";
import DeleteDocument from "../DeleteDocument";
import InviteUser from "../InviteUser";
import ManageUsers from "../ManageUsers";
import Avatars from "../Avatars";


function Document({ id }: { id: string }) {
  const [data, loding, errror] = useDocumentData(doc(db, "documents", id))
  const [input, setInput] = useState("");
  const [isUpdating, startTransition] = useTransition();
  const isOwner = useOwner();



  useEffect(() => {
    if (data) {
      setInput(data.title);
    }

  }, [data])

  const updateTitle = (e: FormEvent) => {
    e.preventDefault();

    if (input.trim()) {
      startTransition(async () => {
        await updateDoc(doc(db, "documents", id), {
          title: input,

        })
      })
    }
  }
  return (
    <div className="flex-1 h-full bg-white p-5">

      <div className="flex max-w-6xl mx-auto justify-between pb-5 gap-2">
        <form onSubmit={updateTitle} className="flex flex-1 space-x-2">
          {/** Update the title **/}
          <Input

            value={input}
            onChange={(e) => setInput(e.target.value)} />

          <Button disabled={isUpdating} type="submit" className="min-w-[80px]">{isUpdating ? (
            <div className="flex items-center">
              <svg
                className="animate-spin h-5 w-5 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" />
                <path d="M4 12a8 8 0 0 1 16 0" />
              </svg>
              {/* Updating */}
            </div>
          ) : "Update"}
          </Button>


          {isOwner && (
            <>
              {/* Invite User */}
              {/* Delete Document */}
              <InviteUser />
              <DeleteDocument />

            </>
          )}

        </form>
      </div>


      {/*Manage Users */}

       <div className="flex max-w-6xl mx-auto justify-between items-center mb-5">  
      <ManageUsers />
      <Avatars />
      </div> 
      



      
      {/*Collaborative Editor */}
      <hr className="pb-10" />
      <Editor />
    </div>
  )
}

export default Document
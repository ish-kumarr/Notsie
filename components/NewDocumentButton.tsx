'use client'

import { useTransition } from 'react';
import { Button } from './ui/button'
import { useRouter } from 'next/navigation';
import { createNewDocument } from '@/actions/actions';
// import { Router } from 'lucide-react';

function NewDocumentButton() {
    const [isPending, startTransition] = useTransition();
     const router = useRouter();

    const handleCreateNewDocument = () => {
        startTransition(async () => {
            const {docId} = await createNewDocument();
            router.push(`/doc/${docId}`)
        });

    };

  return <button
  onClick={handleCreateNewDocument}
  className="relative rounded-md px-5 py-2.5 overflow-hidden group bg-purple-500 hover:bg-gradient-to-r hover:from-purple-500 hover:to-violet-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-violet-400 transition-all ease-out duration-300 min-w-[150px]"
  disabled={isPending}
>
  <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
  
  {isPending ? (
    <div className="flex items-center">
      <svg
        className="animate-spin h-5 w-5 mr-3 text-white"
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
      Creating 🤔...
    </div>
  ) : (
    <span className="relative">📇 New Document</span>
  )}
</button>
  
}

export default NewDocumentButton
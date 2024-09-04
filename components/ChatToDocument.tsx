"use client"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { FormEvent, useState, useTransition } from "react"
import { Button } from "./ui/button"
import { usePathname, useRouter } from "next/navigation";
import { deleteDocument, handleDocumentAndQuestion, inviteUserToDocument } from "@/actions/actions";
import { toast } from "sonner";
import { Input } from "./ui/input";
import * as Y from "yjs";
import { BotIcon, MessageCircleCode } from "lucide-react";
import Markdown from "react-markdown";

function ChatToDocument({ doc }: { doc: Y.Doc }) {
    const [input, setInput] = useState("")
    const [isOpen, setIsOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [summary, setSummary] = useState("")
    const [question, setQuestion] = useState("")

    const handleAskQuestion = async (e: FormEvent) => {
        e.preventDefault();

        setQuestion(input); // Update the question state

        startTransition(async () => {
            const documentData = doc.get("document-store").toJSON();
            const documentDataString = JSON.stringify(documentData);

            try {
                const response = await handleDocumentAndQuestion(documentDataString, input); // Pass the latest input
                setSummary(response); // Update the summary with the response
                toast.success("Question answered successfully!");
                console.log("Document Data:", documentData);
console.log("Question:", question);

            } catch (error) {
                console.error("Error while asking question:", error);
                toast.error("Failed to get the answer.");
            }
        });
    };


    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <Button asChild variant="outline">
                <DialogTrigger>
                    <MessageCircleCode className="mr-2" />
                    Chat to Document
                </DialogTrigger>
            </Button>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Chat with Notsie!</DialogTitle>
                    <DialogDescription>
                        Chat with the document's notes and comments. Ask questions or share insights.
                    </DialogDescription>

                    <hr className="mt-5" />

                    {question && <p className="mt-5 text-gray-500">Q: {question}</p>}

                </DialogHeader>


                {
                    summary && (
                        <div className="flex flex-col items-start max-h-96 overflow-y-scroll gap-2 p-5 bg-gray-100">
                            <div className="flex">
                                <BotIcon className="w-10 flex-shrink-0" />
                                <p className="font-bold">
                                    <span className="">Notsie AI</span> {isPending ? "is thinking..." : "Says:"}
                                </p>
                            </div>
                            <p>{isPending ? "Thinking..." : <Markdown>{summary}</Markdown>}</p>
                        </div>
                    )
                }

                <form className="flex gap-2 " onSubmit={handleAskQuestion}>
                    <Input type="text" className="w-full" placeholder="What is this about?" value={input} onChange={(e) => setInput(e.target.value)} />

                    <Button type="submit" disabled={!input || isPending}>
                        {isPending ? "Asking..." : "Ask"}
                    </Button>
                </form>

            </DialogContent>
        </Dialog>
    )
}

export default ChatToDocument
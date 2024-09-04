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
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  
import * as Y from "yjs";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { FormEvent, useState, useTransition } from "react";
import { BotIcon, LanguagesIcon } from "lucide-react";
import { toast } from "sonner";
import Markdown from "react-markdown";
import GeminiClient from 'gemini-client'; // Import the GeminiClient class or function
import { translateDocumentWithGemini } from "@/actions/actions";

const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);


const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

type Language = "english" | "spanish" | "portuguese" | "french" | "german" | "chinese" | "arabic" | "hindi" | "russian" | "japanese";

const languages: Language[] = ["english", "spanish", "portuguese", "french", "german", "chinese", "arabic", "hindi", "russian", "japanese"];

function TranslateDocument({ doc }: { doc: Y.Doc }) { 

    const [language, setLanguage] = useState<string>("");
    const [summary, setSummary] = useState("");
    const [question, setQuestion] = useState("");
    const [isPending, startTransition] = useTransition();

    const [isOpen, setIsOpen] = useState(false);
    const handleAskQuestion = (e: FormEvent) => {
        e.preventDefault();


        startTransition(async () => {
    const documentData = doc.get("document-store").toJSON();

    const documentDataString = JSON.stringify(documentData); // Convert to string if needed

            try {
                const translatedText = await translateDocumentWithGemini(documentDataString, language);
                setSummary(translatedText);
                toast.success("Translation completed successfully!");
                // console.log("Translated document:", translatedText);
            } catch (error) {
                console.error("Translation failed:", error);
                toast.error("Translation failed.");
            }

});

    }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
    <Button asChild variant="outline">
        <DialogTrigger><LanguagesIcon />Translate</DialogTrigger>
    </Button>
    <DialogContent>
        <DialogHeader>
            <DialogTitle>Translate & Summarize Document using AI!</DialogTitle>
            <DialogDescription>
                Select the language you want to translate the document summary to.
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
                        <span className="">Notsie AI</span> {isPending? "is thinking..." : "Says:"}
                    </p>
                   </div>
                   <p>{isPending ? "Thinking..." : <Markdown>{summary}</Markdown>}</p>
                </div>
            )
        }


        <form className="flex gap-2 " onSubmit={handleAskQuestion}>
            <Select
            value={language}
            onValueChange={(value) => setLanguage(value)}
            >
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Language" />
                </SelectTrigger>

                <SelectContent>
                    {languages.map((language) => (
                        <SelectItem key={language} value={language}>
                            {language.charAt(0).toUpperCase() + language.slice(1) }
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

        <Button type="submit" disabled={!language || isPending}>
            {isPending ? "Translating..." : "Translate"}
        </Button>
        </form>

    </DialogContent>
</Dialog>
)
  
}

export default TranslateDocument
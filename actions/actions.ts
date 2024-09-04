"use server"

import { adminDb } from "@/firebase-admin";
import liveblocks from "@/lib/liveblocks";
import { auth } from "@clerk/nextjs/server"
import { DoorClosed } from "lucide-react";
import { GoogleGenerativeAI } from '@google/generative-ai'; // Ensure correct import path

const apiKey = process.env.GOOGLE_APPLICATION_CREDENTIALS; // Rename to a more appropriate name if needed

if (!apiKey) {
    throw new Error('GOOGLE_API_KEY environment variable is not set');
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

export async function createNewDocument() {
    auth().protect();
    const { sessionClaims } = await auth();

    const docCollectionRef = adminDb.collection("documents");
    const docRef = await docCollectionRef.add({
        title: "New Doc"
    });
    await adminDb.collection('users').doc(sessionClaims?.email!).collection('rooms').doc(docRef.id).set({
        userId: sessionClaims?.email!,
        role: "owner",
        createdAt: new Date(),
        roomId: docRef.id,

    })


    return { docId: docRef.id }

}

export async function deleteDocument(roomId: string) {
    auth().protect();
    try {
        await adminDb.collection("documents").doc(roomId).delete();
        const query = await adminDb
            .collectionGroup("rooms")
            .where("roomId", "==", roomId)
            .get();

        const batch = adminDb.batch();
        query.docs.forEach((doc) => {
            batch.delete(doc.ref);
        });
        await batch.commit();

        await liveblocks.deleteRoom(roomId);
        return { success: true };

    }
    catch (error) {
        console.error("Error deleting document: ", error);
        return { success: false };
    }
}

export async function inviteUserToDocument(roomId:string, email:string){

    auth().protect();

    try{
        await adminDb
        .collection('users')
        .doc(email)
        .collection('rooms')
        .doc(roomId)
        .set({
            userId: email,
            role: "editor",
            createdAt: new Date(),
            roomId: roomId,
        })

        return { success: true };
    }catch (error){
        console.error("Error inviting user to document: ", error);
        return { success: false };
    }

}

export async function removeUserFromDocument(roomId: string, email:string){

    try{
        await adminDb
       .collection('users')
       .doc(email)
       .collection('rooms')
       .doc(roomId)
       .delete();
        return { success: true };

    } catch (error){
        console.error("Error removing user from document: ", error);
        return { success: false };
    }

}

export async function translateDocumentWithGemini(documentData: string, targetLanguage: string) {
    try {
        const request = {
            content: documentData, // Include the XML-like document as a string
            targetLanguageCode: targetLanguage,
        };

        const prompt = `Generate a SHORT CONSISE ONE PARAGRAPH summary of only the text content within <text> tags in XML-like document: ${documentData} \n\n into Target Language: ${targetLanguage}  \n\n`

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return response.text()
    } catch (error) {
        console.error("Error during translation:", error);
        throw new Error("Translation failed.");
    }
}

export async function handleDocumentAndQuestion(documentData: string, question: string) {
    try {
        // Prepare the prompt for the AI model
        const prompt = `
            You are an assistant helping the user to chat with a document. I am providing a JSON file of the markdown for the document. Using this, answer the user's question in the clearest way possible. The document is about:
            ${documentData}
            
            My Question is: ${question}
        `;

        // Start a chat with the AI model
        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: question }],
                },
                {
                    role: "model",
                    parts: [{ text: prompt }],
                },
            ],
        });

        // Send the user's question to the chat
        const chatCompletion = await chat.sendMessage(question);

        // Extract the response content directly
        const response = chatCompletion.response.text(); // Ensure this matches your model's response structure

        console.log("Response from AI:", response); // Debugging line

        return response;
    } catch (error) {
        console.error("Error during chat initialization:", error);
        throw new Error("Chat failed.");
    }
}

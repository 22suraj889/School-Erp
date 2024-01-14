import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";

export const calculateCollectionLength = async (collectionName) => {
    console.log(collectionName);
    try {

        const querySnapshot = await getDocs(collection(db, collectionName));
        const length = querySnapshot.size;
        console.log(length);
        return length;

    } catch (error) {
        console.error("Error counting documents:", error);
        return -1;
    }
};

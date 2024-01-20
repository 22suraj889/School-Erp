import { collection, doc, getDocs, getDoc, query, where, collectionGroup } from 'firebase/firestore';
import { db } from "../../config/firebase";

// export const fetchSyllabus = async (className) => {
//     const classRef = doc(db, "syllabus_status", className);
//     try {
//         const docSnapshot = await getDoc(classRef);
//         const syllabusData = {};

//         if (docSnapshot.exists()) {
//             const innerCollections = docSnapshot.data();
//             for (const collectionName in innerCollections) {
//                 const collectionRef = collection(classRef, collectionName);
//                 const collectionSnapshot = await getDocs(collectionRef);

//                 syllabusData[collectionName] = {};
//                 collectionSnapshot.forEach((doc) => {
//                     syllabusData[collectionName][doc.id] = doc.data();
//                 });
//             }
//         }

//         return syllabusData;
//     } catch (error) {
//         console.error('Error fetching syllabus', error);
//         return { status: false, message: 'An error occurred while fetching syllabus' };
//     }
// };


// export const fetchSyllabus = async (className) => {
//     const classRef = collection(db, "syllabus_status", className);

//     try {
//         const docSnapshot = await getDocs(classRef);
//         const syllabusData = {};

//         docSnapshot.forEach((doc) => {
//             const docId = doc.id;
//             const innerCollections = doc.data();

//             syllabusData[docId] = {};

//             for (const subjectCode in innerCollections) {
//                 const subjectRef = collection(classRef.doc(docId), subjectCode);
//                 const subjectSnapshot =  getDocs(subjectRef);

//                 syllabusData[docId][subjectCode] = {};

//                 subjectSnapshot.forEach((innerDoc) => {
//                     syllabusData[docId][subjectCode][innerDoc.id] = innerDoc.data();
//                 });
//             }
//         });

//         return syllabusData;
//     } catch (error) {
//         console.error('Error fetching syllabus', error);
//         return { status: false, message: 'An error occurred while fetching syllabus' };
//     }
// };



export const fetchSyllabus = async (className, subjectCode) => {
    const classRef = collection(db, "syllabus_status", className);

    try {
        const docSnapshot = await getDocs(classRef);
        const syllabusData = {};

        docSnapshot.forEach((doc) => {
            const docId = doc.id;
            const innerCollections = doc.data();

            syllabusData[docId] = {};

            if  (subjectCode && innerCollections[subjectCode]) {
                // Fetch data for the specified subjectCode only
                const subjectRef = collection(classRef.doc(docId), subjectCode);
                const subjectSnapshot =  getDocs(subjectRef);

                syllabusData[docId][subjectCode] = {};

                subjectSnapshot.forEach((innerDoc) => {
                    syllabusData[docId][subjectCode][innerDoc.id] = innerDoc.data();
                });
            } else {
                // Fetch data for all subjectCodes
                for (const code in innerCollections) {
                    const subjectRef = collection(classRef.doc(docId), code);
                    const subjectSnapshot =  getDocs(subjectRef);

                    syllabusData[docId][code] = {};

                    subjectSnapshot.forEach((innerDoc) => {
                        syllabusData[docId][code][innerDoc.id] = innerDoc.data();
                    });
                }
            }
        });

        return syllabusData;
    } catch (error) {
        console.error('Error fetching syllabus', error);
        return { status: false, message: 'An error occurred while fetching syllabus' };
    }
};

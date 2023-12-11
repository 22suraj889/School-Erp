import { db } from "../../config/firebase";
import {
  doc,
  getDocs,
  addDoc,
  collection,
  updateDoc,
  deleteDoc,
  getDoc,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

/**
 * Add a class and sections to the database.
 * @param {Object} classData - An object containing class and sections data.
 * @param {string} classData.className - The class name.
 * @param {number} classData.noOfSections - The number of sections.
 * @param {Array} classData.subjects - An array of subjects.
 * @param {Array} classData.optionalSubjects - An array of optional subjects.
 */
export const addClassAndSectionsToDatabase = async (classData) => {
  const classAndSectionsRef = collection(db, "AddClassAndSections");
  try {
    const className = classData.className;
    const noOfSections = classData.noOfSections;

    const nameOfSections = [];
    for (let i = 1; i <= noOfSections; i++) {
      const sectionName = `${className}${String.fromCharCode(64 + i)}`;
      nameOfSections.push(sectionName);
    }

    await addDoc(classAndSectionsRef, {
      className,
      noOfSections,
      nameOfSections, //will auto generate when wants use we can use
      subjects: classData.subjects,
      optionalSubjects: classData.optionalSubjects,
      createdAt: serverTimestamp(),
    });


    console.log("Document successfully written!");
    await addAssignSubjectsToDatabase(nameOfSections, classData.subjects, classData.optionalSubjects);

    console.log("Subjects added successfully!");
    return { status: true, message: "Document successfully added" };
  } catch (error) {
    console.error("Error adding document:", error);
    return { status: false, message: "Error adding document" };
  }
};

export const getClassAndSectionsDatabase = async () => {
  const classAndSectionsRef = collection(db, "AddClassAndSections");
  try {
    const q = query(classAndSectionsRef, orderBy("createdAt", "asc")); // Add the orderBy query here

    const querySnapshot = await getDocs(q);

    const classAndSectionsData = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.subjects || data.optionalSubjects) {
        data.optionalSubjects = data.optionalSubjects.join(", ");
        data.subjects = data.subjects.join(", "); 
      }
      const modifiedData = {
        id: doc.id,
        "Class Name": data.className,
        "No Of Sections": data.noOfSections,
        Subjects: data.subjects || [],
        "Optional Subjects": data.optionalSubjects || [],
      };
      classAndSectionsData.push(modifiedData);
    });

    return classAndSectionsData; // Return the classAndSectionsData
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const updateClassAndSectionsDatabase = async (
  documentId,
  updatedClassData
) => {
  const classAndSectionsRef = collection(db, "AddClassAndSections");
  const classDocRef = doc(classAndSectionsRef, documentId); // Use Id to reference the specific document

  try {
    await updateDoc(classDocRef, updatedClassData);
    console.log("Document successfully updated!");
    return { status: true, message: "Document successfully updated" };
  } catch (error) {
    console.error("Error updating document:", error);
    return { status: false, message: "Error updating document" };
  }
};

export const deleteClassAndSectionsData = async (classId) => {
  const classAndSectionsRef = collection(db, "AddClassAndSections");
  const classDocRef = doc(classAndSectionsRef, classId);

  try {
    await deleteDoc(classDocRef);
    console.log("Document successfully deleted!");
    return { status: true, message: "Document successfully deleted" };
  } catch (error) {
    console.error("Error deleting document:", error);
    return { status: false, message: "Error deleting document" };
  }
};

export const getClassAndSectionsDataFromDb = async (classAutoGeneratedId) => {
  try {
    const classDocRef = doc(db, "AddClassAndSections", classAutoGeneratedId);
    const classDocSnapshot = await getDoc(classDocRef);

    if (classDocSnapshot.exists()) {
      return classDocSnapshot.data();
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching class and sections data", error);
    throw error;
  }
};

const addAssignSubjectsToDatabase = async (nameOfSections, subjects, optionalSubjects) => {
  const assignClassRef = collection(db, "AssignSubjects");

  try {
    for (const sectionName of nameOfSections) {
      // Check if sectionName is a valid string
      if (typeof sectionName !== 'string' || sectionName.trim() === '') {
        console.error('Invalid sectionName:', sectionName);
        continue; // Skip to the next iteration
      }

      // Create a reference to the document with the sectionName as docId
      const sectionDocRef = doc(assignClassRef, sectionName);

      // Create an object to store subjects and their boolean values
      const subjectsData = {};

      // Map regular subjects to true and optional subjects to false
      subjects.forEach(subject => {
        subjectsData[subject] = false;
      });

      optionalSubjects.forEach(optionalSubject => {
        subjectsData[optionalSubject] = false;
      });

      console.log(subjectsData);

      // Set the data to the document
      await setDoc(sectionDocRef, subjectsData);
    }
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

export const getAllclassNames = async () => {
  const classAndSectionsRef = collection(db, "AddClassAndSections");
  try {
    const querySnapshot = await getDocs(classAndSectionsRef);

    const classNameData = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();

      classNameData.push(data.className);
    });

    return classNameData;
  } catch (error) {
    console.error(error);
  }
};
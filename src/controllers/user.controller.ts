import { Request, Response, NextFunction } from "express";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";
import {
  getFirestore,
  collection,
  where,
  getDocs,
  query,
  runTransaction,
  doc,
} from "firebase/firestore";
//  "postbuild": "cp -r src/images dist/ && cp -r src/data dist/ && tsc",
export const UserSignUpHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      req.body.email,
      req.body.password
    );
    const firestore = getFirestore();
    const collectionRef = collection(firestore, "users");

    // Wrap the addDoc operation inside a transaction
    await runTransaction(firestore, async (transaction) => {
      const newDocRef = doc(collectionRef);
      transaction.set(newDocRef, {
        uid: userCredential.user.uid,
        email: req.body.email,
      });
    });
    console.log("success registered");

    return res.status(200).json({
      uid: userCredential.user.uid,
      email: req.body.email,
    });
  } catch (error: any) {
    let errorCode = 500; // Default to Internal Server Error
    const errorMessage = error.message;
    console.log(errorMessage);
    // Check if the error has a code that can be used as an HTTP status code
    if (typeof error.code === "string" && error.code.startsWith("auth/")) {
      const statusCode = parseInt(error.code.substr(5));
      if (!isNaN(statusCode) && statusCode >= 400 && statusCode < 600) {
        errorCode = statusCode;
      }
    }
    return res
      .status(errorCode)
      .json({ message: "Sign-up error: " + errorMessage });
  }
};
export const UserSignInHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      req.body.email,
      req.body.password
    );
    console.log(userCredential.user.uid);
    const firestore = getFirestore();
    const collectionRef = collection(firestore, "users");
    const q = query(collectionRef, where("uid", "==", userCredential.user.uid));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty)
      return res.status(401).json({ message: "user not found." });

    const doc = querySnapshot.docs[0];
    console.log("user logged successfully");
    return res.status(200).json({
      uid: doc.data().uid,
      email: req.body.email,
    });
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    if (errorCode === "auth/user-not-found") {
      return res
        .status(401)
        .json({ message: "User does not exist. Please sign up first." });
    } else if (errorCode === "auth/wrong-password")
      return res
        .status(401)
        .json({ message: "Wrong password , please try again" });
    else {
      return res
        .status(401)
        .json({ message: "Sign-in error: " + errorMessage });
    }
  }
};

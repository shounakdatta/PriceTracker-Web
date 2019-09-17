import firebase, { firestore } from "../config/Fire";

export function loginUser(userObj) {
  const { email, password } = userObj;
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch(({ code, message }) => ({ errorCode: code, message }));
}

export function validateUser() {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      unsubscribe();
      if (user) resolve(user);
      else reject("User is not logged in or has timed out");
    });
  });
}

export function logoutUser() {
  return firebase
    .auth()
    .signOut()
    .catch(({ code, message }) => ({ errorCode: code, message }));
}

export function createUser(userObj) {
  const { email, password } = userObj;
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .catch(({ code, message }) => ({ errorCode: code, message }));
}

export function createUserInDB(loginUser) {
  return new Promise((resolve, reject) => {
    const { uid } = loginUser;
    const collectionRef = firestore.collection("users");
    collectionRef
      .where("uid", "==", uid)
      .get()
      .then(snap => {
        let user = undefined;
        let docId = undefined;
        snap.forEach(doc => {
          if (!!doc.data()) {
            user = doc.data();
            docId = doc.id;
          }
        });
        if (!user) {
          collectionRef
            .add({
              uid
            })
            .then(docRef => resolve(docRef.id))
            .catch(({ code, message }) => reject({ errorCode: code, message }));
        } else resolve(docId);
      })
      .catch(({ code, message }) => reject({ errorCode: code, message }));
  });
}

export function updateUser(userObj) {
  return firebase
    .auth()
    .currentUser.updateProfile(userObj)
    .catch(({ code, message }) => ({ errorCode: code, message }));
}

export function getUser() {
  return firebase.auth().currentUser;
}

export function forgotUserPassword(email) {
  return firebase.auth().sendPasswordResetEmail(email, {
    url: "http://localhost:3000/",
    handleCodeInApp: true
  });
}

export function resetUserPassword(verificationObj) {
  const { code, newPassword } = verificationObj;
  return firebase.auth().confirmPasswordReset(code, newPassword);
}

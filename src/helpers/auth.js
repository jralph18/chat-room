import { auth } from "../service/firebase"

export function signup(email, password) {
    try{
        return auth().createUserWithEmailAndPassword(email, password);
    } catch (error) {
        return error;
    }
}

export function signin(email, password) {
    return auth().signInWithEmailAndPassword(email, password)
}

export function signInWithGoogle() {
    const provider = new auth.GoogleAuthProvider();
    return auth().signInWithPopup(provider);
}
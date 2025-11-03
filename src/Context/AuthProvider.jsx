import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContexts';
import { auth } from '../Firebase/firebase.init';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut,  } from 'firebase/auth';


const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({children}) => {
   const [user, setUser] = useState(null);
   const [loading, setLoading] = useState(true)

// create usr
   const createUser =(email, password)=>{
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
   }
   
  //  sign in 
  const signInUser=(email, password) =>{
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }
  // sign in with google
  const signInWithGoogle = ()=>{
    setLoading(true)
    return signInWithPopup(auth, googleProvider)
  }
 
  //   sign out
  const signOutUser = ()=>{
    setLoading(true)
    return signOut(auth)
  }
  // observer sett
  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
      setUser(currentUser)
      setLoading(false)
    })
    return ()=>{
      unsubscribe()
    }
  },[])
   
  const authInfo = {
    createUser,
    user,
    loading,
    setUser,
    setLoading,
    signInUser,
    signInWithGoogle,
    signOutUser

  }

  return (
   <AuthContext value={authInfo}>
        {children}
   </AuthContext>
  );
};

export default AuthProvider;
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "./firebase.js";


const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const retypePassword = document.getElementById("retypePassword").value;

    if (password !== retypePassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User signed up:", userCredential.user);
      alert("Signup successful! Redirecting to login...");
      window.location.href = "./index.html"; // Redirect to login page
    } catch (error) {
      console.error("Error:", error.message);
      alert(error.message);
    }
  });
}
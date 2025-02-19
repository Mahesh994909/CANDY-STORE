import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "./firebase.js";
const signinForm = document.getElementById("Usersignin");
if (signinForm) {
  signinForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email2").value;
    const password = document.getElementById("password2").value;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("User signed in:", userCredential.user);
      alert("Login successful! Redirecting...");
      window.location.href = "./main.html"; // Redirect after login
    } catch (error) {
      console.error("Login Error:", error.message);
      alert("Invalid email or password. Please try again.");
    }
  });
}
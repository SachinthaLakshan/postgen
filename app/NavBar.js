"use client";
import Link from "next/link";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function NavBar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check for session cookie
    if (typeof document !== 'undefined' && document.cookie.split('; ').find(row => row.startsWith('auth-token'))) {
      setLoggedIn(true);
      console.log("logged in");
      
    } else {
      setLoggedIn(false);
      console.log("not logged in",document.cookie);
    }
  }, []);

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    setLoggedIn(false);
    router.push("/login");
  };

  return (
    <header className={styles.header}>
      <div className={styles.brand}>ArunaAI</div>
      <nav className={styles.navLinks}>
        {!loggedIn && (
          <>
            <Link href="/login" className={styles.navLink}>Login</Link>
            <Link href="/register" className={styles.navLink}>Register</Link>
          </>
        )}
        {loggedIn && (
          <button
            className={styles.navLink}
            onClick={handleLogout}
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            Logout
          </button>
        )}
      </nav>
    </header>
  );
} 
"use client";
import { useState } from "react";
import styles from "../page.module.css";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) throw new Error("Registration failed");
      router.push("/login");
    } catch (err) {
      setError(err.message || "Registration failed");
    }
    setLoading(false);
  }

  return (
    <div className={styles.discordBg}>
      <main className={styles.discordContainer}>
        <h1 className={styles.title}>Register</h1>
        <form className={styles.promptForm} onSubmit={handleSubmit}>
          <input
            className={styles.textarea}
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            disabled={loading}
          />
          <input
            className={styles.textarea}
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            disabled={loading}
          />
          <button className={styles.generateBtn} type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        {error && <div className={styles.error}>{error}</div>}
      </main>
    </div>
  );
} 
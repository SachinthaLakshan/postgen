import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import styles from "./page.module.css";
import ImageGenerator from "./ImageGenerator";

export default function Home() {
  const session = cookies().get("session")?.value;
  if (!session) {
    redirect("/login");
  }

  return (
    <div className={styles.discordBg}>
      <main className={styles.discordContainer}>
        <h1 className={styles.title}>
          Bulk Image Generator <span className={styles.discordAccent}>AI</span>
        </h1>
        <ImageGenerator />
      </main>
    </div>
  );
}

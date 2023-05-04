import Head from "next/head";
import styles from "../styles/index.module.scss";

export default function Home() {
  return (
    <>
      <Head>
        <title>Moroshima&apos;s Blog</title>
        <meta
          name="description"
          content="Everything faded into mist. The past was erased, the erasure was forgotten, the lie became truth."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.phrase}>
          <p>Everything faded into mist.</p>
          <p>
            The past was erased, the erasure was forgotten, the lie became
            truth.
          </p>
          <p>
            George Orwell. <i>Nineteen Eighty-Four</i>.
          </p>
        </div>
      </main>
    </>
  );
}

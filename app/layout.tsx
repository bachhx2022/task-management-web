import type { ReactNode } from "react";
import { StoreProvider } from "./StoreProvider";
import "./styles/globals.css";
import styles from "./styles/layout.module.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";

interface Props {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <StoreProvider>
      <html lang="en">
        <body>
          <AppRouterCacheProvider>
            <section className={styles.container}>
              <main className={styles.main}>{children}</main>
            </section>
          </AppRouterCacheProvider>
        </body>
      </html>
    </StoreProvider>
  );
}

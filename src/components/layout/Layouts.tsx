import React from "react";
import { Sidebar } from "./Sidebar";
import styles from "./Layouts.module.css";

export const SettingsLayout = ({
  children,
  title = "Settings",
  description = "Manage your workspace preferences and integrations."
}: {
  children: React.ReactNode;
  title?: string;
  description?: string;
}) => {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.mainContent}>
        <header className={styles.header}>
          <div className={styles.headerInfo}>
            <h1 className={styles.pageTitle}>{title}</h1>
            <p className={styles.pageSubtitle}>{description}</p>
          </div>
        </header>
        <div className={styles.contentContainer}>
          {children}
        </div>
      </main>
    </div>
  );
};

export const AnalyticsLayout = ({
  children,
  title = "Analytics Overview",
}: {
  children: React.ReactNode;
  title?: string;
}) => {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.mainContent}>
        <header className={styles.header}>
          <div className={styles.headerInfo}>
            <h1 className={styles.pageTitle}>{title}</h1>
            <div className={styles.datePicker}>Last 30 Days</div>
          </div>
        </header>
        <div className={styles.contentContainer}>
          {children}
        </div>
      </main>
    </div>
  );
};

import React from 'react';
import { APP_NAME, COLORS, APP_VERSION } from './constants';
import './App.css';

function App() {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>{APP_NAME}</h1>
        <p style={styles.subtitle}>タスク & カレンダー管理アプリ</p>
      </div>

      <div style={styles.content}>
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>今日のタスク</h2>
          <p style={styles.cardContent}>タスクがありません</p>
        </div>

        <div style={styles.card}>
          <h2 style={styles.cardTitle}>今後の予定</h2>
          <p style={styles.cardContent}>予定がありません</p>
        </div>
      </div>

      <div style={styles.footer}>
        <p style={styles.footerText}>Version {APP_VERSION}</p>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    backgroundColor: COLORS.BACKGROUND.PRIMARY,
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    backgroundColor: COLORS.PRIMARY,
    padding: '20px',
    paddingTop: '40px',
    textAlign: 'center',
    boxShadow: '0 2px 3px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: COLORS.WHITE,
    marginBottom: '5px',
    margin: 0,
  },
  subtitle: {
    fontSize: '14px',
    color: COLORS.WHITE,
    opacity: 0.9,
    margin: 0,
  },
  content: {
    flex: 1,
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  card: {
    backgroundColor: COLORS.WHITE,
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
    border: `1px solid ${COLORS.BORDER.DEFAULT}`,
  },
  cardTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: COLORS.TEXT.PRIMARY,
    marginBottom: '10px',
    marginTop: 0,
  },
  cardContent: {
    fontSize: '14px',
    color: COLORS.TEXT.SECONDARY,
    margin: 0,
  },
  footer: {
    padding: '20px',
    textAlign: 'center',
    borderTop: `1px solid ${COLORS.BORDER.LIGHT}`,
  },
  footerText: {
    fontSize: '12px',
    color: COLORS.TEXT.TERTIARY,
    margin: 0,
  },
};

export default App;

import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Home`}
      description="It's a game. With dragons. And dungeons. Sort of.">
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <img src="/img/basicDragon.png" height="90px" style={{ imageRendering: 'pixelated' }} />
          <h1 className="hero__title">{siteConfig.title.toUpperCase()}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className="button button--secondary button--lg"
              to="/docs/intro">
              Play
            </Link>
          </div>
        </div>
      </header>
    </Layout>
  );
}

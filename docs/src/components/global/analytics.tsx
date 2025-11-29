'use client';
import dynamic from 'next/dynamic';

const SiteViews = dynamic(() => import('react-siteviews'), { ssr: false });

const Analytics = () => {
  return (
    <SiteViews
      projectName="jobx documantation"
      suppressLogs
      style={{ position: 'absolute', opacity: 0 }}
    />
  );
};

export default Analytics;

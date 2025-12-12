'use client';

import { withAuth } from '@/hoc';
import { Role } from '@/types';

const AdminPage = () => {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Admin Panel</h1>
          <p className="text-muted-foreground">
            Administrative tools and system management
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* User Management */}
          <div className="bg-card p-6 rounded-lg border">
            <h3 className="text-lg font-semibold mb-2">User Management</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Manage user accounts and permissions
            </p>
            <div className="space-y-2">
              <button
                type="button"
                className="w-full text-left text-sm p-2 rounded hover:bg-muted transition-colors"
              >
                👥 View All Users
              </button>
              <button
                type="button"
                className="w-full text-left text-sm p-2 rounded hover:bg-muted transition-colors"
              >
                ➕ Add New User
              </button>
              <button
                type="button"
                className="w-full text-left text-sm p-2 rounded hover:bg-muted transition-colors"
              >
                🔒 Manage Roles
              </button>
            </div>
          </div>

          {/* System Analytics */}
          <div className="bg-card p-6 rounded-lg border">
            <h3 className="text-lg font-semibold mb-2">System Analytics</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Platform usage and performance metrics
            </p>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Total Applications</span>
                <span className="font-semibold">0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Active Users</span>
                <span className="font-semibold">1</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Success Rate</span>
                <span className="font-semibold">0%</span>
              </div>
            </div>
          </div>

          {/* System Configuration */}
          <div className="bg-card p-6 rounded-lg border">
            <h3 className="text-lg font-semibold mb-2">Configuration</h3>
            <p className="text-sm text-muted-foreground mb-4">
              System settings and configuration
            </p>
            <div className="space-y-2">
              <button
                type="button"
                className="w-full text-left text-sm p-2 rounded hover:bg-muted transition-colors"
              >
                ⚙️ General Settings
              </button>
              <button
                type="button"
                className="w-full text-left text-sm p-2 rounded hover:bg-muted transition-colors"
              >
                🔐 Security Settings
              </button>
              <button
                type="button"
                className="w-full text-left text-sm p-2 rounded hover:bg-muted transition-colors"
              >
                📧 Email Configuration
              </button>
            </div>
          </div>

          {/* Application Monitoring */}
          <div className="bg-card p-6 rounded-lg border">
            <h3 className="text-lg font-semibold mb-2">
              Application Monitoring
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Monitor job applications and system health
            </p>
            <div className="space-y-2">
              <button
                type="button"
                className="w-full text-left text-sm p-2 rounded hover:bg-muted transition-colors"
              >
                📊 View Logs
              </button>
              <button
                type="button"
                className="w-full text-left text-sm p-2 rounded hover:bg-muted transition-colors"
              >
                🚨 Error Reports
              </button>
              <button
                type="button"
                className="w-full text-left text-sm p-2 rounded hover:bg-muted transition-colors"
              >
                📈 Performance Metrics
              </button>
            </div>
          </div>

          {/* Database Management */}
          <div className="bg-card p-6 rounded-lg border">
            <h3 className="text-lg font-semibold mb-2">Database</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Database operations and maintenance
            </p>
            <div className="space-y-2">
              <button
                type="button"
                className="w-full text-left text-sm p-2 rounded hover:bg-muted transition-colors"
              >
                💾 Backup Database
              </button>
              <button
                type="button"
                className="w-full text-left text-sm p-2 rounded hover:bg-muted transition-colors"
              >
                🔄 Restore Database
              </button>
              <button
                type="button"
                className="w-full text-left text-sm p-2 rounded hover:bg-muted transition-colors"
              >
                🧹 Clean Up Data
              </button>
            </div>
          </div>

          {/* API Management */}
          <div className="bg-card p-6 rounded-lg border">
            <h3 className="text-lg font-semibold mb-2">API Management</h3>
            <p className="text-sm text-muted-foreground mb-4">
              API keys and external integrations
            </p>
            <div className="space-y-2">
              <button
                type="button"
                className="w-full text-left text-sm p-2 rounded hover:bg-muted transition-colors"
              >
                🔑 Manage API Keys
              </button>
              <button
                type="button"
                className="w-full text-left text-sm p-2 rounded hover:bg-muted transition-colors"
              >
                🔗 External Services
              </button>
              <button
                type="button"
                className="w-full text-left text-sm p-2 rounded hover:bg-muted transition-colors"
              >
                📋 API Documentation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(AdminPage, [Role.ADMIN, Role.SUPPER_ADMIN]);

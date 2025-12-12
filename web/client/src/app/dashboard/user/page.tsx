'use client';

import { userApi } from '@/redux';

const UserPage = () => {
  const { data: user } = userApi.useMyProfileQuery();

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">My Applications</h1>
          <p className="text-muted-foreground">
            Manage your job applications and track progress
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Application Stats */}
          <div className="bg-card p-6 rounded-lg border">
            <h3 className="text-lg font-semibold mb-2">
              Application Statistics
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Your application performance overview
            </p>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Total Applications</span>
                <span className="font-semibold">0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Pending</span>
                <span className="font-semibold text-yellow-600">0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Accepted</span>
                <span className="font-semibold text-green-600">0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Rejected</span>
                <span className="font-semibold text-red-600">0</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-card p-6 rounded-lg border">
            <h3 className="text-lg font-semibold mb-2">Quick Actions</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Common tasks and shortcuts
            </p>
            <div className="space-y-2">
              <button
                type="button"
                className="w-full text-left text-sm p-2 rounded hover:bg-muted transition-colors"
              >
                ➕ New Application
              </button>
              <button
                type="button"
                className="w-full text-left text-sm p-2 rounded hover:bg-muted transition-colors"
              >
                📝 Update Resume
              </button>
              <button
                type="button"
                className="w-full text-left text-sm p-2 rounded hover:bg-muted transition-colors"
              >
                📧 Generate Cover Letter
              </button>
              <button
                type="button"
                className="w-full text-left text-sm p-2 rounded hover:bg-muted transition-colors"
              >
                📊 View Analytics
              </button>
            </div>
          </div>

          {/* Profile Summary */}
          <div className="bg-card p-6 rounded-lg border">
            <h3 className="text-lg font-semibold mb-2">Profile Summary</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Your account information
            </p>
            <div className="space-y-2 text-sm">
              <p>
                <strong>Name:</strong> {user?.data?.name}
              </p>
              <p>
                <strong>Email:</strong> {user?.data?.email}
              </p>
              <p>
                <strong>Member Since:</strong>{' '}
                {user?.data?.createdAt
                  ? new Date(user.data.createdAt).toLocaleDateString()
                  : 'N/A'}
              </p>
              <p>
                <strong>Status:</strong>{' '}
                {user?.data?.isVerified ? (
                  <span className="text-green-600">✅ Verified</span>
                ) : (
                  <span className="text-red-600">❌ Not Verified</span>
                )}
              </p>
            </div>
          </div>

          {/* Recent Applications */}
          <div className="bg-card p-6 rounded-lg border md:col-span-2 lg:col-span-3">
            <h3 className="text-lg font-semibold mb-2">Recent Applications</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Your latest job applications
            </p>
            <div className="text-center py-8 text-muted-foreground">
              <p>No applications yet</p>
              <p className="text-sm mt-2">
                Start by creating your first job application!
              </p>
            </div>
          </div>

          {/* JobX Tools */}
          <div className="bg-card p-6 rounded-lg border">
            <h3 className="text-lg font-semibold mb-2">JobX Tools</h3>
            <p className="text-sm text-muted-foreground mb-4">
              AI-powered job search tools
            </p>
            <div className="space-y-2">
              <button
                type="button"
                className="w-full text-left text-sm p-2 rounded hover:bg-muted transition-colors"
              >
                🤖 AI Email Generator
              </button>
              <button
                type="button"
                className="w-full text-left text-sm p-2 rounded hover:bg-muted transition-colors"
              >
                📋 Resume Builder
              </button>
              <button
                type="button"
                className="w-full text-left text-sm p-2 rounded hover:bg-muted transition-colors"
              >
                🎯 Job Matcher
              </button>
              <button
                type="button"
                className="w-full text-left text-sm p-2 rounded hover:bg-muted transition-colors"
              >
                📈 Application Tracker
              </button>
            </div>
          </div>

          {/* Settings */}
          <div className="bg-card p-6 rounded-lg border">
            <h3 className="text-lg font-semibold mb-2">Settings</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Customize your experience
            </p>
            <div className="space-y-2">
              <button
                type="button"
                className="w-full text-left text-sm p-2 rounded hover:bg-muted transition-colors"
              >
                👤 Edit Profile
              </button>
              <button
                type="button"
                className="w-full text-left text-sm p-2 rounded hover:bg-muted transition-colors"
              >
                🔔 Notifications
              </button>
              <button
                type="button"
                className="w-full text-left text-sm p-2 rounded hover:bg-muted transition-colors"
              >
                🔒 Privacy Settings
              </button>
              <button
                type="button"
                className="w-full text-left text-sm p-2 rounded hover:bg-muted transition-colors"
              >
                🎨 Appearance
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;

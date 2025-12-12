'use client';

import { PasswordChangeForm, ProfileUpdateForm } from '@/components/admin';
import {
  DashboardContent,
  DashboardHeader,
  DashboardLayout,
  DashboardSection,
  InfoCard,
  StatItem,
} from '@/components/dashboard';
import { withAuth } from '@/hoc';
import { userApi } from '@/redux';

const UserPage = () => {
  const { data: user } = userApi.useMyProfileQuery();

  return (
    <DashboardLayout>
      <DashboardHeader
        title="My Dashboard"
        userName={user?.data?.name}
        description="Manage your account settings and personal preferences"
        variant="user"
      />

      <DashboardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <DashboardSection
            title="Profile Settings"
            description="Update your personal information and profile picture"
          >
            <ProfileUpdateForm user={user?.data} />
          </DashboardSection>

          <DashboardSection
            title="Security Settings"
            description="Change your password to keep your account secure"
          >
            <PasswordChangeForm />
          </DashboardSection>
        </div>

        <div className="mt-12 lg:mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          <InfoCard title="Account Information">
            <div className="space-y-4">
              <StatItem
                label="Email Address"
                value={user?.data?.email || 'N/A'}
              />
              <StatItem
                label="Account Status"
                value={
                  user?.data?.isVerified ? '✅ Verified' : '❌ Not Verified'
                }
                valueColor={
                  user?.data?.isVerified ? 'text-green-600' : 'text-red-600'
                }
              />
              <StatItem
                label="Member Since"
                value={
                  user?.data?.createdAt
                    ? new Date(user.data.createdAt).toLocaleDateString(
                        'en-US',
                        {
                          year: 'numeric',
                          month: 'short',
                        }
                      )
                    : 'N/A'
                }
              />
            </div>
          </InfoCard>

          <InfoCard title="Activity Overview" variant="gradient">
            <div className="space-y-4">
              <StatItem
                label="Job Applications"
                value="0"
                valueColor="text-primary"
                size="lg"
              />
              <StatItem
                label="Success Rate"
                value="0%"
                valueColor="text-green-600"
                size="lg"
              />
              <StatItem
                label="This Month"
                value="0"
                valueColor="text-blue-600"
                size="lg"
              />
            </div>
          </InfoCard>
        </div>
      </DashboardContent>
    </DashboardLayout>
  );
};

export default withAuth(UserPage);

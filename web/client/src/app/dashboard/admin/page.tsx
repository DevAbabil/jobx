'use client';

import { PasswordChangeForm, ProfileUpdateForm } from '@/components/admin';
import {
  DashboardContent,
  DashboardHeader,
  DashboardLayout,
  DashboardSection,
  InfoCard,
} from '@/components/dashboard';
import { withAuth } from '@/hoc';
import { userApi } from '@/redux';

const AdminPage = () => {
  const { data: user } = userApi.useMyProfileQuery();

  return (
    <DashboardLayout>
      <DashboardHeader
        title="Admin Dashboard"
        userName={user?.data?.name}
        description="Manage your account settings and administrative preferences"
        variant="admin"
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

        <div className="mt-12 lg:mt-16">
          <InfoCard title="Account Information">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 text-sm">
              <div className="text-center md:text-left">
                <p className="font-medium text-muted-foreground mb-1">
                  Email Address
                </p>
                <p className="break-all">{user?.data?.email}</p>
              </div>
              <div className="text-center md:text-left">
                <p className="font-medium text-muted-foreground mb-1">
                  Account Role
                </p>
                <p className="text-orange-600 font-medium">
                  {user?.data?.role}
                </p>
              </div>
              <div className="text-center md:text-left">
                <p className="font-medium text-muted-foreground mb-1">
                  Member Since
                </p>
                <p>
                  {user?.data?.createdAt
                    ? new Date(user.data.createdAt).toLocaleDateString(
                        'en-US',
                        {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        }
                      )
                    : 'N/A'}
                </p>
              </div>
            </div>
          </InfoCard>
        </div>
      </DashboardContent>
    </DashboardLayout>
  );
};

export default withAuth(AdminPage);

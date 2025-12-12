'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface UserStatsCardProps {
  user?: {
    name: string;
    email: string;
    role: string;
    isVerified?: boolean;
    createdAt: string;
  };
}

export const UserStatsCard = ({ user }: UserStatsCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Summary</CardTitle>
        <CardDescription>Your account information</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm">
          <p>
            <strong>Name:</strong> {user?.name}
          </p>
          <p>
            <strong>Email:</strong> {user?.email}
          </p>
          <p>
            <strong>Role:</strong> {user?.role}
          </p>
          <p>
            <strong>Member Since:</strong>{' '}
            {user?.createdAt
              ? new Date(user.createdAt).toLocaleDateString()
              : 'N/A'}
          </p>
          <p>
            <strong>Status:</strong>{' '}
            {user?.isVerified ? (
              <span className="text-green-600">✅ Verified</span>
            ) : (
              <span className="text-red-600">❌ Not Verified</span>
            )}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

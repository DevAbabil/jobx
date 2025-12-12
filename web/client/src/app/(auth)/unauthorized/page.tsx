'use client';

import Link from 'next/link';
import { AuthCard } from '@/components/auth';
import { Button } from '@/components/ui/button';
import { withAuth } from '@/hoc';

const UnauthorizedPage = () => {
  return (
    <AuthCard
      title="Access Denied"
      description="You don't have permission to access this resource"
    >
      <div className="text-center space-y-4">
        <div className="text-destructive text-4xl">🚫</div>
        <p className="text-sm text-muted-foreground">
          Please sign in with an authorized account or contact your
          administrator
        </p>
        <div className="space-y-2">
          <Link href="/login">
            <Button className="w-full">Sign in</Button>
          </Link>
          <Link
            href="/"
            className="block text-sm text-primary hover:text-primary/80"
          >
            Go to homepage
          </Link>
        </div>
      </div>
    </AuthCard>
  );
};

export default withAuth(UnauthorizedPage);

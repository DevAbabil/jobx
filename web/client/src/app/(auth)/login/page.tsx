'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { AuthCard, AuthFormField } from '@/components/auth';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { withPreventAccessInAuth } from '@/hoc';
import authApi from '@/redux/api/auth.api';
import { extractError } from '@/utils';

const signInSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
});

type SignInFormData = z.infer<typeof signInSchema>;

const LoginPage = () => {
  const router = useRouter();
  const [signin, { isLoading }] = authApi.useSigninMutation();

  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      const response = await signin(data).unwrap();
      toast.success(response.message);
      router.push('/dashboard'); // Redirect to dashboard or home
    } catch (error) {
      toast.error(extractError(error) || 'Sign in failed. Please try again.');
    }
  };

  return (
    <AuthCard
      title="Sign in"
      description="Enter your email and password to sign in to your account"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <AuthFormField
            control={form.control}
            name="email"
            label="Email"
            placeholder="Enter your email"
            type="email"
          />

          <AuthFormField
            control={form.control}
            name="password"
            label="Password"
            placeholder="Enter your password"
            type="password"
          />

          <div className="flex items-center justify-between">
            <Link
              href="/forgot-password"
              className="text-sm text-primary hover:text-primary/80"
            >
              Forgot your password?
            </Link>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>
      </Form>

      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          Don't have an account?{' '}
          <Link
            href="/register"
            className="text-primary hover:text-primary/80 font-medium"
          >
            Sign up
          </Link>
        </p>
      </div>
    </AuthCard>
  );
};

export default withPreventAccessInAuth(LoginPage);

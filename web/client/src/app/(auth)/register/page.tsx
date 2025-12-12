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

const signUpSchema = z
  .object({
    name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
    email: z.string().email({ message: 'Invalid email address' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type SignUpFormData = z.infer<typeof signUpSchema>;

const RegisterPage = () => {
  const router = useRouter();
  const [signup, { isLoading }] = authApi.useSignupMutation();

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      const { confirmPassword, ...signupData } = data;
      const response = await signup(signupData).unwrap();
      toast.success(response.message);
      router.push('/login');
    } catch (error) {
      toast.error(
        extractError(error) || 'Registration failed. Please try again.'
      );
    }
  };

  return (
    <AuthCard
      title="Create account"
      description="Enter your information to create your account"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <AuthFormField
            control={form.control}
            name="name"
            label="Full Name"
            placeholder="Enter your full name"
            type="text"
          />

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

          <AuthFormField
            control={form.control}
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Confirm your password"
            type="password"
          />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Creating account...' : 'Create account'}
          </Button>
        </form>
      </Form>

      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link
            href="/login"
            className="text-primary hover:text-primary/80 font-medium"
          >
            Sign in
          </Link>
        </p>
      </div>
    </AuthCard>
  );
};

export default withPreventAccessInAuth(RegisterPage);

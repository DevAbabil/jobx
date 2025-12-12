'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { userApi } from '@/redux';
import { extractError } from '@/utils';

const profileSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(100, 'Name must be less than 100 characters'),
  picture: z
    .string()
    .url('Must be a valid image URL')
    .optional()
    .or(z.literal('')),
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface ProfileUpdateFormProps {
  user?: {
    name: string;
    email: string;
    picture?: string | null;
  };
}

export const ProfileUpdateForm = ({ user }: ProfileUpdateFormProps) => {
  const [updateProfile, { isLoading: isUpdatingProfile }] =
    userApi.useUpdateProfileMutation();

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: '',
      picture: '',
    },
  });

  // Update form values when user data changes
  useEffect(() => {
    if (user && !form.formState.isDirty) {
      form.reset({
        name: user.name,
        picture: user.picture || '',
      });
    }
  }, [user, form]);

  const onSubmit = async (data: ProfileFormData) => {
    try {
      const response = await updateProfile(data).unwrap();
      toast.success(response.message);
      form.reset(data);
    } catch (error) {
      toast.error(extractError(error) || 'Failed to update profile');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>Update your name and profile picture</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Profile Picture Preview */}
            <div className="flex items-center space-x-4">
              <Avatar src={user?.picture} name={user?.name} size="lg" />
              <div>
                <p className="text-sm font-medium">Profile Picture</p>
                <p className="text-xs text-muted-foreground">
                  {user?.picture
                    ? 'Current picture'
                    : 'Default avatar with initials'}
                </p>
              </div>
            </div>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="picture"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profile Picture URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter image URL (optional)"
                      type="url"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Show current email (read-only) */}
            <div className="space-y-2">
              <div className="text-sm font-medium">Email (Read-only)</div>
              <div className="px-3 py-2 bg-muted rounded-md text-sm text-muted-foreground">
                {user?.email || 'No email set'}
              </div>
            </div>

            <div className="border-t pt-4 mt-4">
              <div className="flex justify-end">
                <Button type="submit" disabled={isUpdatingProfile}>
                  {isUpdatingProfile ? 'Updating...' : 'Update Profile'}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

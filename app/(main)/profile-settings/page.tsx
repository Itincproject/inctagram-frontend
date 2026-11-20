'use client';

import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';

import { Tabs } from '@/shared/ui/Tabs/Tabs';
import { TextArea } from '@/shared/ui/TextArea/TextArea';
import { Button } from '@/shared/ui/Button/Button';
import { DatePicker } from '@/shared/ui/DatePicker/DatePicker';
import { Input } from '@/shared/ui/Inputs/Input';
import { Icon } from '@/shared/ui/Icon/Icon';
import { AlertModal } from '@/shared/ui/AlertModal/AlertModal'; 

import { ProfileFormData, profileSchema } from './model/schema';
import { useGetMyProfileQuery, useUpdateMyProfileMutation } from './api/profileApi';
import styles from './page.module.css';

const TABS = [
  { value: 'general', title: 'General information' },
  { value: 'devices', title: 'Devices' },
  { value: 'account', title: 'Account Management' },
  { value: 'payments', title: 'My payments' },
];

export default function ProfileSettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({ title: '', text: '' });

  const { data: profileData, isLoading: isProfileLoading } = useGetMyProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateMyProfileMutation();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: '',
      firstName: '',
      lastName: '',
      aboutMe: '',
    },
  });

  useEffect(() => {
    if (profileData) {
      reset({
        username: profileData.username || '',
        firstName: profileData.firstName || '',
        lastName: profileData.lastName || '',
        aboutMe: profileData.aboutMe || '',
        dateOfBirth: profileData.birthDate ? new Date(profileData.birthDate) : undefined,
        country: profileData.country || '',
        city: profileData.city || '',
      });
    }
  }, [profileData, reset]);

  const onSubmit = async (data: ProfileFormData) => {
    try {
      await updateProfile(data).unwrap();
      
      setModalData({ title: 'Success', text: 'Your settings are saved!' });
      setModalOpen(true);
    } catch (error) {
      setModalData({ title: 'Error', text: 'Error! Server is not available!' });
      setModalOpen(true);
    }
  };

  if (isProfileLoading) return <div style={{ padding: '40px', color: 'white' }}>Loading profile...</div>;

  return (
    <div className={styles.container}>
      <Tabs items={TABS} value={activeTab} onValueChange={setActiveTab} />

      <div className={styles.tabContent}>
        {activeTab === 'general' && (
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            
            <div className={styles.mainBlock}>
              <div className={styles.avatarColumn}>
                <div className={styles.avatarPlaceholder}>
                  <Icon name="image-outline" size={48} />
                </div>
                <Button type="button" title="Select Profile Photo" variant="outline" />
              </div>

              <div className={styles.inputsColumn}>
                <Input
                  label="Username"
                  placeholder="Username"
                  required
                  {...register('username')}
                  error={errors.username?.message}
                />
                <Input
                  label="First Name"
                  placeholder="First Name"
                  required
                  {...register('firstName')}
                  error={errors.firstName?.message}
                />
                <Input
                  label="Last Name"
                  placeholder="Last Name"
                  required
                  {...register('lastName')}
                  error={errors.lastName?.message}
                />

                <Controller
                  control={control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <DatePicker
                      label="Date of birth"
                      className={styles.fullWidthDatePicker}
                      value={field.value}
                      onChange={field.onChange}
                      error={
                        errors.dateOfBirth ? (
                          <>
                            {errors.dateOfBirth.message}{' '}
                            <Link href="/privacy-policy" style={{ color: '#cc1439', textDecoration: 'underline' }}>
                              Privacy Policy
                            </Link>
                          </>
                        ) : undefined
                      }
                    />
                  )}
                />

                <div className={styles.row}>
                  <div className={styles.halfWidth}>
                    <Input label="Select your country" placeholder="Country" {...register('country')} />
                  </div>
                  <div className={styles.halfWidth}>
                    <Input label="Select your city" placeholder="City" {...register('city')} />
                  </div>
                </div>

                <TextArea
                  label="About Me"
                  placeholder="Text-area"
                  rows={4}
                  {...register('aboutMe')}
                  error={errors.aboutMe?.message}
                />
              </div>
            </div>

            <div className={styles.footer}>
              <Button 
                type="submit" 
                title={isUpdating ? 'Saving...' : 'Save Changes'} 
                disabled={isUpdating} 
              />
            </div>
          </form>
        )}

        {activeTab === 'devices' && <div>Devices settings</div>}
        {activeTab === 'account' && <div>Account management</div>}
        {activeTab === 'payments' && <div>My payments</div>}
      </div>

      <AlertModal 
        open={modalOpen}
        title={modalData.title}
        text={modalData.text}
        isOneBtn={true}
        onClose={() => setModalOpen(false)}
        width={438}
        height={240}
      />
    </div>
  );
}

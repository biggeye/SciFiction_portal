import { useCallback, useEffect, useState } from 'react';
import { Button, Box, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import Avatar from "./Avatar";
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import SignOut from "./SignOut";

export default function AccountForm() {
  const supabaseClient = useSupabaseClient();
  const user = useUser();

  const [loading, setLoading] = useState(true)
  const [profileDetails, setProfileDetails] = useState({
    full_name: null,
    username: null,
    website: null,
    avatar_url: null
  });

  const { full_name, username, website, avatar_url } = profileDetails;

  const getProfile = useCallback(async () => {
    try {
      setLoading(true)

      const { data, error, status } = await supabaseClient
        .from('profiles')
        .select(`full_name, username, website, avatar_url`)
        .eq('id', user?.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setProfileDetails(data);
      }
    } catch (error) {
      alert('Error loading user data!');
    } finally {
      setLoading(false);
    }
  }, [user?.id, supabaseClient]);


  /*
  useEffect(() => {
    if (avatar_url) {
      updateProfile();
    }
  }, [profileDetails]);
  */

  useEffect(() => {
    getProfile();
  }, [getProfile, user?.id]);

  async function updateProfile(e) {

    try {
      setLoading(true);

      const { error } = await supabaseClient
        .from('profiles')
        .upsert({
          id: user?.id,
          full_name,
          username,
          website,
          avatar_url,
          updated_at: new Date().toISOString(),
        });

      if (error) {
        throw error;
      }

      alert('Profile updated!');
    } catch (error) {
      alert('Error updating the data!');
    } finally {
      setLoading(false);
    }
  }

  const handleInputChange = event => {
    const { name, value } = event.target;
    setProfileDetails({ ...profileDetails, [name]: value });
  }

  return (
    <Box>
      <Avatar
        supabaseClient={supabaseClient}
        user={user}
        uid={user?.id}
        url={avatar_url}
        size={150}
        onUpload={(url) => {
          setProfileDetails({ ...profileDetails, avatar_url: url });
          updateProfile();
        }}
      />
      <form onSubmit={updateProfile}>
        <FormControl id="email" isDisabled>
          <FormLabel>Email</FormLabel>
          <Input type="text" defaultValue={user?.email || ''} />
        </FormControl>

        <FormControl id="fullName">
          <FormLabel>Full Name</FormLabel>
          <Input
            type="text"
            name="full_name"
            value={full_name || ''}
            onChange={handleInputChange}
          />
        </FormControl>

        <FormControl id="username">
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            name="username"
            value={username || ''}
            onChange={handleInputChange}
          />
        </FormControl>

        <FormControl id="website">
          <FormLabel>Website</FormLabel>
          <Input
            type="url"
            name="website"
            value={website || ''}
            onChange={handleInputChange}
          />
        </FormControl>

        <Button
          mt={4}
          colorScheme="teal"
          isLoading={loading}
          type="submit"
        >
          Update
        </Button>
      </form>

      <SignOut />
    </Box>
  )
}

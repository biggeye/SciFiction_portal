'use client'
import { useCallback, useEffect, useState } from 'react';
import { Button, Box, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import Avatar from "./Avatar";

export default function AccountForm({ supabaseClient, user }) {
  const [loading, setLoading] = useState(true)
  const [fullname, setFullname] = useState(null)
  const [username, setUsername] = useState(null)
  const [website, setWebsite] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)

  const getProfile = useCallback(async () => {
    try {
      setLoading(true)

      let { data, error, status } = await supabaseClient
        .from('profiles')
        .select(`full_name, username, website, avatar_url`)
        .eq('id', user?.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setFullname(data.full_name)
        setUsername(data.username)
        setWebsite(data.website)
        setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      alert('Error loading user data!')
    } finally {
      setLoading(false)
    }
  }, [user, supabaseClient])

  useEffect(() => {
    getProfile()
  }, [user, getProfile])

  async function updateProfile({
    username,
    website,
    avatar_url,
  }) {
    try {
      setLoading(true)

      let { error } = await supabase.from('profiles').upsert({
        id: user?.id,
        full_name: fullname,
        username,
        website,
        avatar_url,
        updated_at: new Date().toISOString(),
      })
      if (error) throw error
      alert('Profile updated!')
    } catch (error) {
      alert('Error updating the data!')
    } finally {
      setLoading(false)
    }
  }


  return (
    <Box>
      <Avatar
        supabaseClient={supabaseClient}
        user={user}
        uid={user.id}
        url={avatar_url}
        size={150}
        onUpload={(url) => {
          setAvatarUrl(url)
          updateProfile({ fullname, username, website, avatar_url: url })
        }}
      />
      <FormControl id="email" isDisabled>
        <FormLabel>Email</FormLabel>
        <Input type="text" value={user?.email || ''} />
      </FormControl>
  
      <FormControl id="fullName">
        <FormLabel>Full Name</FormLabel>
        <Input
          type="text"
          value={fullname || ''}
          onChange={(e) => setFullname(e.target.value)}
        />
      </FormControl>
  
      <FormControl id="username">
        <FormLabel>Username</FormLabel>
        <Input
          type="text"
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
        />
      </FormControl>
  
      <FormControl id="website">
        <FormLabel>Website</FormLabel>
        <Input
          type="url"
          value={website || ''}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </FormControl>
  
      <Button
        mt={4}
        colorScheme="teal"
        isLoading={loading}
        onClick={() => updateProfile({ fullname, username, website, avatar_url })}
      >
        Update
      </Button>
  
      <form action="/auth/signout" method="post">
        <Button mt={4} colorScheme="red" type="submit">
          Sign out
        </Button>
      </form>
    </Box>
  )  
}
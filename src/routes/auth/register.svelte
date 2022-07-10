<script>
  import { Form } from '$lib/components/form';
  import { Input } from '$lib/components/input';
  import { Button } from '$lib/components/button';
  import { Alert } from '$lib/components/alert';
  import { register } from '$lib/modules/auth';

  let name = '';
  let email = '';
  let password = '';
  let error = '';
  let loading = false;

  const handleRegister = async () => {
    loading = true;
    error = '';

    const data = await register({ name, email, password });

    if (data.error) {
      error = data.error;
      loading = false;
      return;
    }

    window.location.href = '/app';
  };
</script>

<Form on:submit={handleRegister} {loading}>
  <Input type="text" bind:value={name} placeholder="Your name" />
  <Input type="email" bind:value={email} placeholder="Email address" />
  <Input type="password" bind:value={password} placeholder="Password" />
  <Button primary type="submit">Register</Button>
  <Button href="/auth/login">Already have an account?</Button>
</Form>

{#if !!error}
  <Alert error>{error}</Alert>
{/if}

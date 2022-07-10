<script>
  import { Form } from '$lib/components/form';
  import { Input } from '$lib/components/input';
  import { Button } from '$lib/components/button';
  import { Alert } from '$lib/components/alert';
  import { login } from '$lib/modules/auth';

  let email = '';
  let password = '';
  let error = '';
  let loading = false;

  const handleLogin = async () => {
    loading = true;
    error = '';

    const data = await login({ email, password });

    if (data.error) {
      error = data.error;
      loading = false;
      return;
    }

    window.location.href = '/app';
  };
</script>

<Form on:submit={handleLogin} {loading}>
  <Input type="email" bind:value={email} placeholder="Email address" />
  <Input type="password" bind:value={password} placeholder="Password" />
  <Button primary type="submit">Sign in</Button>
  <Button href="/auth/register">Create new account</Button>
</Form>

{#if !!error}
  <Alert error>{error}</Alert>
{/if}

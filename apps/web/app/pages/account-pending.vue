<template>
  <div class="flex min-h-screen flex-col items-center justify-center gap-6 p-8 text-center">
    <h1 class="text-2xl font-bold">Zugang wird geprüft</h1>
    <p class="max-w-md text-gray-600">
      Ihr Account wurde angelegt, wartet aber noch auf die Freigabe durch unser Team.
      Sie werden benachrichtigt, sobald Ihr Zugang aktiviert wurde.
    </p>
    <SfButton variant="secondary" @click="handleLogout">Abmelden</SfButton>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'login-wall' });

const { logout: logoutUser } = useCustomer();
const localePath = useLocalePath();

async function handleLogout() {
  await logoutUser();
  navigateTo(localePath('/login'));
}
</script>

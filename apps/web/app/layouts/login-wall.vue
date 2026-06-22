<template>
  <div class="min-h-screen bg-white flex flex-col">
    <header class="px-8 py-6">
      <img src="/login-logo.jpg" alt="Logo" class="h-10 w-auto" />
    </header>

    <main class="flex-grow flex items-center justify-center px-6">
      <div class="w-full max-w-md">
        <slot />
      </div>
    </main>

    <footer class="px-8 py-6 text-center text-sm text-gray-400 flex justify-center gap-6">
      <NuxtLink :to="localePath('/terms-and-conditions')" class="hover:text-gray-600">AGB</NuxtLink>
      <NuxtLink :to="localePath('/legal-disclosure')" class="hover:text-gray-600">Impressum</NuxtLink>
      <NuxtLink :to="localePath('/privacy-policy')" class="hover:text-gray-600">Datenschutz</NuxtLink>
    </footer>
  </div>
</template>

<script setup lang="ts">
const localePath = useLocalePath();
</script>

<template>
  <NuxtLayout name="login-wall">
    <LoginComponent :is-soft-login="true" @logged-in="navigateAfterAuth" />
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { Locale } from '#i18n';

defineI18nRoute({
  locales: process.env.LANGUAGELIST?.split(',') as Locale[],
});

definePageMeta({
  layout: false,
  middleware: ['guest-guard'],
});
const { setPageMeta } = usePageMeta();

const icon = 'page';
setPageMeta(t('authentication.login.submitLabel'), icon);
useHead({
  meta: [{ name: 'robots', content: 'noindex, nofollow' }],
});

const router = useRouter();
const localePath = useLocalePath();

const navigateAfterAuth = () => {
  const redirectUrl = router.currentRoute.value.query.redirect as string;
  window.location.href = redirectUrl ? localePath(redirectUrl) : localePath(paths.home);
};
</script>

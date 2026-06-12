const WHITELIST = [
  '/login',
  '/register',
  '/reset-password',
  '/set-new-password',
  '/account-pending',
  '/terms-and-conditions',
  '/legal-disclosure',
  '/privacy-policy',
];

function isWhitelisted(path: string): boolean {
  // Strip 2-letter locale prefix if present (e.g. /de/login -> /login)
  const normalized = path.replace(/^\/[a-z]{2}(\/|$)/, '/');
  return WHITELIST.some((p) => normalized === p || normalized.startsWith(p + '/'));
}

export default defineNuxtRouteMiddleware(async (to) => {
  if (isWhitelisted(to.path)) {
    setPageLayout('login-wall');
    return;
  }

  const { isAuthorized, user } = useCustomer();
  const { fetchSession } = useFetchSession();
  const localePath = useLocalePath();
  const b2bClassId = Number(useRuntimeConfig().public.b2bClassId);

  await fetchSession();

  if (!isAuthorized.value) {
    return navigateTo({
      path: localePath('/login'),
      query: { redirect: to.fullPath },
    });
  }

  if (user.value?.classId !== b2bClassId) {
    return navigateTo(localePath('/account-pending'));
  }
});

import { addRouteMiddleware, createResolver, defineNuxtModule } from 'nuxt/kit';

export default defineNuxtModule({
  meta: {
    name: 'login-wall',
  },
  setup(_options, nuxt) {
    const resolver = createResolver(import.meta.url);

    nuxt.options.runtimeConfig.public.b2bClassIds = process.env.B2B_CLASS_IDS ?? '2,4,5';

    nuxt.options.app.head = {
      ...nuxt.options.app.head,
      meta: [
        ...(nuxt.options.app.head?.meta ?? []),
        { name: 'robots', content: 'noindex, nofollow' },
      ],
    };

    addRouteMiddleware({
      name: 'login-wall',
      path: resolver.resolve('./runtime/middleware/login-wall.global'),
      global: true,
    });
  },
});

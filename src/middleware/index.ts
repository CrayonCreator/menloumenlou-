import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
    locales: ['en', 'zh'],
    defaultLocale: 'zh',
})

export const config = {
    matchers: ['/((?!api|_next|.*\\..*).*)']
}
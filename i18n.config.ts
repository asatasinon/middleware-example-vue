/**
 * Global i18n configuration.
 * The currency setting (e.g. "USD") only works with Stripe for now.
 * For LemonSqueezy, we need to set the currency in the LemonSqueezy dashboard
 * and there can only be one.
 */
export default defineI18nConfig(() => ({
	legacy: false,
	availableLocales: ['en', 'zh_cn'],
	locale: 'zh_cn',
	fallbackLocale: 'zh_cn',
	numberFormats: {
		'en': {
			currency: {
				style: 'currency',
				currency: 'USD',
				notation: 'standard',
			},
			number: {
				style: 'decimal',
				maximumFractionDigits: 0,
			},
			percent: {
				style: 'percent',
				useGrouping: false,
			},
		},
		'zh_cn': {
			currency: {
				style: 'currency',
				currency: 'CNY',
				notation: 'standard',
			},
			number: {
				style: 'decimal',
				maximumFractionDigits: 0,
			},
			percent: {
				style: 'percent',
				useGrouping: false,
			},
		},
	},
}))

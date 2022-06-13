import { useTranslation, UseTranslationResponse } from 'react-i18next'
import { Translations } from '../i18n/locales'

export type AppTranslationResponse = Omit<
UseTranslationResponse<'translation', undefined>,
't'
> & { t: (key: keyof Translations['translations']) => string }

export function useAppTranslation (): AppTranslationResponse {
  return useTranslation()
}

import { RootState } from './core/infra/frameworks/redux'
import { Translations } from './i18n/locales'

export { }

declare global {

  interface WrapperFC {
    t: (key: keyof Translations['translations']) => string
    select: <T extends keyof RootState > (key: T) => RootState[T]
    dispatch: Dispatch<AnyAction>
  }

}

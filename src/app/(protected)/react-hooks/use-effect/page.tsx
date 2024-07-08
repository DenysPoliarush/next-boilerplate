import { BasicEffect } from './BasicEffect'
import { EffectCleanup } from './EffectCleanup'
import { MultipleEffects } from './MultipleEffects'
import { SkippingEffects } from './SkippingEffects'

export default function useEffectPage () {
  return (
    <>
      <BasicEffect />
      <EffectCleanup />
      <MultipleEffects />
      <SkippingEffects />
    </>
  )
}
